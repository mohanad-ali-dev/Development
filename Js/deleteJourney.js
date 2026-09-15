import { developmentData } from "./data.js";
// delet journey
function deleteJourney(index){
  developmentData.journeys.splice(index,1);
  return developmentData.journeys;
};
export { deleteJourney };
