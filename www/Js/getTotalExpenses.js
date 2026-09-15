import { developmentData } from "./data.js";
// get total expenses
function getTotalExpenses() {
  return developmentData.expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
};
export { getTotalExpenses };
