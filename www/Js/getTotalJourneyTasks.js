import { developmentData } from "./data.js";
// get total journeys tasks
function getTotalJourneysTasks(index) {
  return developmentData.journeys[index].journeyTasks.length;
};
export { getTotalJourneysTasks };
