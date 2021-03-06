import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";
import moment from "moment";

////// useTasks//////////////////////////////////////////////////////////////////////////////////////////
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
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));
      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                //make sure the difference in days is <= 7,
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });
    return () => unsubscribe();
  }, [selectedProject]); // re-run the whole code when the selectedProject is changed

  return { tasks, archivedTasks }; // as result, both, as we've set with useState on top of this block
};

////// useProjects////////////////////////////////////////////////////////////////////////////////////////
export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "t25h0csH6Pmxra90")
      .orderBy("projectId")
      .get() // so we get them only once, not like in the upper func.
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        // must keep the if statement so it won't re-run again and again infinitely, and we must be certain that the project has been changed, so THAN the useEffect hook to take action, fire off.
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          // stringified comparison
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
