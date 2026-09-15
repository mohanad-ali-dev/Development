import { developmentData } from "./data.js";
//update expenses
function updateExpense(index,update){
  developmentData.expenses[index].expenseName= update.expenseName?? developmentData.expenses[index].expenseName;
  developmentData.expenses[index].amount= update.amount?? developmentData.expenses[index].amount;
  return developmentData.expenses[index];
};
export { updateExpense };
