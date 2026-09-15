import { developmentData } from "./data.js";
// delete Task 
function deleteTask(index){
  developmentData.tasks.splice(index,1);
  return developmentData.tasks;
};
export { deleteTask };
