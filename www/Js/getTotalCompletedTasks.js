import { developmentData } from "./data.js";
// get total completed tasks
function getTotalCompletedTasks() {
  return developmentData.tasks.filter(tasks => tasks.completed === true).length;
};
export { getTotalCompletedTasks };
