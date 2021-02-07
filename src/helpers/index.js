import { collatedTasks } from "../constants";

export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((x) => x.key === selectedProject);
