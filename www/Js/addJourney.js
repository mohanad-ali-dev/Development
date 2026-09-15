import { developmentData } from "./data.js";
// Add Journey

function addJourney(name, time, tasks) {
  const journey = {
    journeyName: name,
    journeyTime: time,
    journeyTasks: tasks
  };

  developmentData.journeys.push(journey);

  return journey;
}
export { addJourney };
