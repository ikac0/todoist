import React, { useEffect } from "react";
import { useTasks } from "../hooks";
import { Checkbox } from "./Checkbox.jsx";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { AddTask } from "./AddTask";

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject); // get them from the db and show here, using the custom hook with a STRING value, since we specified that it needs to be a string in the fields

  let projectName = "";

  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
    console.log("projectName 1: ", projectName);
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    console.log("projectName 2: ", projectName);
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`; // to change the title of the page
  });
  console.log("tasks - ", tasks);

  return (
    <div className="tasks">
      <h2>{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            {/* so we can tick them /check */}
            <Checkbox id={task.id} />
            {/* so we can display the content that we pull from the db */}
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
      <AddTask />
    </div>
  );
};
