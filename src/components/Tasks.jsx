import React from "react";
import { useTasks } from "../hooks";
import { Checkbox } from "./Checkbox";

export const Tasks = () => {
  const { tasks } = useTasks("1"); // get them from the db and show here

  const projectName = "";

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
    </div>
  );
};
