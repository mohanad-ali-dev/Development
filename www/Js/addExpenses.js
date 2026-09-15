import { developmentData } from "./data.js";
// Add Expense

function addExpenses(expenseName, amount) {
  const expense = {
    expenseName: expenseName,
    amount: amount,
    date: new Date()
  };

  developmentData.expenses.push(expense);

  return expense;
}
export { addExpenses };
