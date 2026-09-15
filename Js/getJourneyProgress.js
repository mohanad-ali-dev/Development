import { developmentData } from "./data.js";
// get joueney progress 
function getJourneyProgress(index) {
  let all  = developmentData.journeys[index].journeyTasks.length;
  let complete = developmentData.journeys[index].journeyTasks.filter(journeyTasks => journeyTasks.completed === true).length;
  let completionRate = complete/all*100;
  return completionRate;
};
export { getJourneyProgress };
