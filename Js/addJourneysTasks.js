import { developmentData } from "./data.js";
// Add Journey Task

function addJourneysTasks(index, task) {
  const journeyTask = {
    taskName: task.taskName,
    classification: task.classification,
    completionTime: task.completionTime
  };

  developmentData.journeys[index].journeyTasks.push(journeyTask);

  return journeyTask;
}
export { addJourneysTasks };
