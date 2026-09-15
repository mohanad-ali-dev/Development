import { developmentData } from "./data.js";
//toggle task status
function toggleTaskStatus(index){
  developmentData.tasks[index].completed = !developmentData.tasks[index].completed;
  return developmentData.tasks[index];
};
export { toggleTaskStatus };
