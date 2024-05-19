class BudgetTracker {
    constructor() {
        this.budget = 0;
        this.income = 0;
        this.expenses = [];
    }

    // ADD INCOME
    addIncome(amount) {
        this.income += amount;
        this.updateBudget();
        document.getElementById('total-income').textContent = this.income;

    }

    //ADD EXPENSES
    addExpense(name, amount) {
        const expense = {name, amount};
        this.expenses.push(expense);
        this.updateBudget();
        this.displayExpenses();
    
        
    }

    //Remove Expenses
    removeExpense(index) {
        this.expenses.splice(index, 1);
        this.updateBudget();
        this.displayExpenses();
    }

    // Update Budget
    updateBudget() {
        const totalExpenses = this.expenses.reduce((total, expense) => total + expense.amount, 0);
        this.budget = this.income - totalExpenses;
        document.getElementById('total-budget').textContent = this.budget;
        document.getElementById('total-spending').textContent = totalExpenses;
    }


    // Show expense history 
    displayExpenses() {
        // console.log("Displaying expenses");
        const expenseHistory = document.getElementById('expense-history');

    // clear array
    expenseHistory.innerHTML = " ";




    // Add new expense rows
    this.expenses.forEach((expense, index) => {
        // console.log("Expense:", expense);
        // Create new table row
        const expenseRow = document.createElement('tr');
        //add class of 'expense-row' to row
        expenseRow.classList.add('expense-row');
        
        // add table cell
        const expenseNameDis = document.createElement('td');
        // let cell display the name of expense
        expenseNameDis.textContent = expense.name;
        // add cell to row
        expenseRow.appendChild(expenseNameDis);

        // add table cell
        const expenseAmtDis = document.createElement('td');
        // let cell display the expense amount
        expenseAmtDis.textContent = `$${expense.amount}`;
        // add cell to row
        expenseRow.appendChild(expenseAmtDis);

        //add table cell
        const removeBtnCell = document.createElement('td');
        // create button
        const removeBtn = document.createElement('button');

         // add class to button for styling purposes
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';

        //remove button functionality 
        removeBtn.addEventListener('click', () => {
            this.removeExpense(index);
        });

        // add button to row
        removeBtnCell.appendChild(removeBtn); 
        expenseRow.appendChild(removeBtnCell);
        
        // add row to table
        expenseHistory.appendChild(expenseRow);
        });
    }

     // Reset the budget tracker
     reset() {
        this.budget = 0;
        this.income = 0;
        this.expenses = [];
        this.updateBudget();
        this.displayExpenses();
    }
}

    // create new budget tracker
const budgetTracker = new BudgetTracker();

// add 'click' event listener to income button
document.getElementById('income-btn').addEventListener('click', function(event){
    event.preventDefault();
    //turn amount string into a number value
    const incomeAmount = parseFloat(document.getElementById('add-income').value);

    // if amount is a number
    if (!isNaN(incomeAmount)) {
        // calls method for adding income
        budgetTracker.addIncome(incomeAmount);

        document.getElementById('add-income').value = '';
    } else {
        // ERROR
        alert('Please enter a valid income amount.');
    }
});

// expense button
document.getElementById('expense-btn').addEventListener('click', function(event){
    event.preventDefault();
    const expenseTitle = document.getElementById('expense-title').value;
    const expenseAmount = parseFloat(document.getElementById('amount').value);
    if (expenseTitle && !isNaN(expenseAmount)) {
        budgetTracker.addExpense(expenseTitle, expenseAmount);
        document.getElementById('expense-title').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter valid expense name and amount.');
    }
});

document.getElementById('reset-btn').addEventListener('click', function(event){
    event.preventDefault();
    budgetTracker.reset();
});
