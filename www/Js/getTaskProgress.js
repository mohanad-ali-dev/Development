import { developmentData } from "./data.js";
// get task progress
function getTaskProgress(){
let all = developmentData.tasks.length;
let complete = developmentData.tasks.filter(tasks => tasks.completed === true).length;
let completionRate = complete/all*100;
return completionRate;
};
export { getTaskProgress };
