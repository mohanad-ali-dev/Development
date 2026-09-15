import { developmentData } from "./data.js";
// Update Task 
function updateTask(index,update){
  developmentData.tasks[index].taskName = update.taskName?? developmentData.tasks[index].taskName;
  developmentData.tasks[index].classification = update.classification?? developmentData.tasks[index].classification;
  developmentData.tasks[index].completionTime = update.taskTime?? developmentData.tasks[index].completionTime;
  return developmentData.tasks[index];
};
export { updateTask };
