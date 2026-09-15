import { developmentData } from "./data.js";
// Add Task

function addTask(names, classifications, time) {
  const task = {
    taskName: names,
    classification: classifications,
    completionTime: time
  };

  developmentData.tasks.push(task);

  return task;
}
export { addTask };
