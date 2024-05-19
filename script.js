// Create Budget Tracker Class
class BudgetTracker {
    // Budget, Income and Expenses Properties
    constructor() {
        this.budget = 0;
        this.income = [];
        this.expenses = [];
    }

    //Method to add income
    addIncome(name, amount) {
        const income = {name, amount};
        this.income.push(income);
        this.updateBudget();
        this.displayIncome();
    }

    addExpense(name, amount) {
        const expense = {name, amount};
        this.expenses.push(expense);
        this.updateBudget();
        this.displayExpenses();
    }

    removeIncome(index) {
        this.income.splice(index, 1);
        this.updateBudget();
        this.displayIncome();
    }

    removeExpense(index) {
        this.expenses.splice(index, 1);
        this.updateBudget();
        this.displayExpenses();
    }

    updateBudget() {
        const totalExpenses = this.expenses.reduce((total, expense) => total + expense.amount, 0);
        this.budget = this.income.reduce((total, income) => total + income.amount, 0) - totalExpenses;
        document.getElementById('total-budget').textContent = this.budget.toFixed(2);
        document.getElementById('total-spending').textContent = totalExpenses.toFixed(2);
        document.getElementById('total-income').textContent = this.income.reduce((total, income) => total + income.amount, 0).toFixed(2);
    }

    displayIncome() {
        const incomeHistory = document.getElementById('income-history');
        incomeHistory.innerHTML = ""; // Clear the content before adding new items

        this.income.forEach((income, index) => {
            const row = incomeHistory.insertRow();
            row.innerHTML = `<td>${income.name}</td>
            <td>$${income.amount.toFixed(2)}</td>
            <td><button class="remove-income" onclick="budgetTracker.removeIncome(${index})">Remove</button></td>`;
        });
    }

    displayExpenses() {
        const expenseHistory = document.getElementById('expense-history');
        expenseHistory.innerHTML = ""; // Clear the content before adding new items

        this.expenses.forEach((expense, index) => {
            const row = expenseHistory.insertRow();
            row.innerHTML = `<td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="budgetTracker.removeExpense(${index})">Remove</button></td>`;
        });
    }

    reset() {
        this.budget = 0;
        this.income = [];
        this.expenses = [];
        this.updateBudget();
        this.displayExpenses();
        this.displayIncome();
    }
}

const budgetTracker = new BudgetTracker();

document.getElementById('income-btn').addEventListener('click', function(event){
    event.preventDefault();
    const incomeTitle = document.getElementById('income-title').value;
    const incomeAmount = parseFloat(document.getElementById('add-income').value);
    if (incomeTitle && !isNaN(incomeAmount)) {
        budgetTracker.addIncome(incomeTitle, incomeAmount);
        document.getElementById('income-title').value = '';
        document.getElementById('add-income').value = '';
    } else {
        alert('Please enter valid income title and amount.');
    }
});

document.getElementById('expense-btn').addEventListener('click', function(event){
    event.preventDefault();
    const expenseTitle = document.getElementById('expense-title').value;
    const expenseAmount = parseFloat(document.getElementById('amount').value);
    if (expenseTitle && !isNaN(expenseAmount)) {
        budgetTracker.addExpense(expenseTitle, expenseAmount);
        document.getElementById('expense-title').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter valid expense title and amount.');
    }
});

document.getElementById('reset-btn').addEventListener('click', function(event){
    event.preventDefault();
    budgetTracker.reset();
});
