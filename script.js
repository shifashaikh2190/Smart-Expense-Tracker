let expenses = [];

const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

addBtn.addEventListener("click", function () {
    let name = expenseName.value.trim();
    
    let amountInput = expenseAmount.value.trim();
    let amount = 0;
    if (amountInput.includes(" ")) {
        let parts = amountInput.split(/\s+/);
        amount = parts.reduce((sum, part) => sum + Number(part), 0);
    } else {
        amount = Number(amountInput);
    }

    if (name === "" || amountInput === "") {
        alert("Please enter a valid name and amount!");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    let expense = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    expenses.push(expense);
    displayExpenses();

    expenseName.value = "";
    expenseAmount.value = "";
});

function displayExpenses() {
    expenseList.innerHTML = "";
    let sum = 0;

    expenses.forEach(function (expense) {
        sum += expense.amount;

        let li = document.createElement("li");
        let text = document.createElement("span");
        let deleteBtn = document.createElement("button");

        text.textContent = expense.name + " - ₹" + expense.amount;
        deleteBtn.textContent = "Delete";

        
        deleteBtn.addEventListener("click", function () {
            expenses = expenses.filter(function (item) {
                return item.id !== expense.id;
            });
            displayExpenses(); 
        });

        li.appendChild(text);
        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
    });

    total.textContent = "₹" + sum.toLocaleString("en-IN");
}
