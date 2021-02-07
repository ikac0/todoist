import React from "react";
import { useTasks } from "../hooks";
import { Checkbox } from "./Checkbox.component";

export const Tasks = () => {
  const { tasks } = useTasks("1"); // get them from the db and show here

  console.log(tasks);

  const projectName = "";

  return (
    <div className="tasks">
      <h2>{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map((x) => (
          <li key={`${x.id}`}>
            {/* so we can tick them /check */}
            <Checkbox id={x.id} />
            {/* so we can display the content that we pull from the db */}
            <span>{x.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
