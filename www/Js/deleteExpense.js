import { developmentData } from "./data.js";
//delete expense 
function deleteExpense(index){
  developmentData.expenses.splice(index,1);
  return developmentData.expenses;
};
export { deleteExpense};
