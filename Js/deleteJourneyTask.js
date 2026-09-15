import { developmentData } from "./data.js";
// delete journey task 
function deleteJourneyTask(indexJ,indexJT) {
  developmentData.journeys[indexJ].journeyTasks.splice(indexJT,1);
  return developmentData.journeys[indexJ].journeyTasks;
};
export { deleteJourneyTask };
