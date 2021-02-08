// import React, { useState } from "react";
// import { useProjectsValue, useSelectedProjectValue } from "../context";

// export const Projects = ({ activeValue = null }) => {
//   const [active, setActive] = useState(activeValue);
//   const { setSelectedProject } = useSelectedProjectValue();
//   const { projects } = useProjectsValue;

//   console.log(projects);

//   return (
//     projects &&
//     projects.map((x) => (
//       <li
//         key={x.projectId}
//         data-doc-id={x.docId}
//         className={
//           active === x.projectId
//             ? "active sidebar__project"
//             : "sidebar__project"
//         }
//         onClick={() => {
//           setActive(x.projectId);
//           setSelectedProject(x.projectId);
//         }}
//         onKeyDown={() => {
//           setActive(x.projectId);
//           setSelectedProject(x.projectId);
//         }}
//       >
//         {("project", JSON.stringify(x))}
//       </li>
//     ))
//   );
// };
import React, { useState } from "react";

import { useSelectedProjectValue, useProjectsValue } from "../context";

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? "active sidebar__project"
            : "sidebar__project"
        }
      >
        <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }
          }}
        >
          {("project", JSON.stringify(project))}
        </div>
      </li>
    ))
  );
};
