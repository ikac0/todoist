import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";
import moment from "moment";

////// useTasks///////

export const useTasks = (selectedProject) => {
  // set a current state for the tasks
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  // checking all the time for a potentional change in the selected projec
  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "t25h0csH6Pmxra90");

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : selectedProject === "TODAY"
        ? (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : selectedProject === "INBOX" || selectedProject === 0
        ? (unsubscribe = unsubscribe.where("date", "==", ""))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));
      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (x) =>
                //make sure the difference in days is <= 7,
                moment(x.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                x.archived !== true
            )
          : newTasks.filter((x) => x.archived === false)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived === true));
    });
    return () => unsubscribe();
  }, [selectedProject]); // re-run the whole code when the selectedProject is changed
  return { tasks, archivedTasks }; // as result, both, as we've set with useState on top of this block
};

////// useProjects////////
export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collections("projects")
      .where("userId", "==", "t25h0csH6Pmxra90")
      .orderBy("projectId")
      .get() // so we get them only once, not like in the upper func.
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((x) => ({
          ...x.data(),
          docId: x.id,
        }));
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);
  return { projects, setProjects };
};
