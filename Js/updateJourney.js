import { developmentData } from "./data.js";
//Update Journey
 function updateJourney(index,update){
    developmentData.journeys[index].journeyName = update.journeyName?? developmentData.journeys[index].journeyName;
    developmentData.journeys[index].journeyTime = update.journeyTime?? developmentData.journeys[index].journeyTime;
    developmentData.journeys[index].journeyTasks = update.journeyTasks?? developmentData.journeys[index].journeyTasks;
    return developmentData.journeys[index];
  };
export { updateJourney };
