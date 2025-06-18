let expenses = [];

document.getElementById('expense-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  const expense = { id: Date.now(), description, amount, date, category };
  expenses.push(expense);
  saveExpenses();
  renderExpenses();
  updateTotal();

  this.reset();
});

function renderExpenses() {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';
  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${exp.description} - ₹${exp.amount} - ${exp.date} - ${exp.category}
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById('total').textContent = total.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  renderExpenses();
  updateTotal();
}

function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
  const data = localStorage.getItem('expenses');
  if (data) {
    expenses = JSON.parse(data);
    renderExpenses();
    updateTotal();
  }
}

loadExpenses();
