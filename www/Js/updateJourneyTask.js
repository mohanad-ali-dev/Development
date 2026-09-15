import { developmentData } from "./data.js";
// update journey task
function updateJourneyTask(indexJ,indexJT,update) {
  developmentData.journeys[indexJ].journeyTasks[indexJT].taskName = update.taskName?? developmentData.journeys[indexJ].journeyTasks[indexJT].taskName;
  developmentData.journeys[indexJ].journeyTasks[indexJT].completed = update.completed?? developmentData.journeys[indexJ].journeyTasks[indexJT].completed;
  developmentData.journeys[indexJ].journeyTasks[indexJT].classification = update.classification?? developmentData.journeys[indexJ].journeyTasks[indexJT].classification;
  return developmentData.journeys[indexJ].journeyTasks[indexJT];
};
export { updateJourneyTask };
