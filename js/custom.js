// GetBudget value and append to Total Budget
const totalBudget = document.getElementById('totalBudget');
const budgetBtn = document.getElementById('budgetBtn');
const getBudget = document.querySelector('.get-budget');

// GetExpense value and append to Total Expenses
const expenseAmount = document.getElementById('expenseAmount');
const expensesBtn = document.getElementById('expensesBtn');
const totalExpenses = document.querySelector('.get-expenses');

const balanceAmount = document.querySelector('.get-balance');
const expenseItem = document.getElementById('expenseItem');
const expensesList = document.querySelector('.expenses-list ul');

const expensesContainer = document.querySelector('.expenses');

const updateBtn = document.createElement('button');
updateBtn.innerHTML = 'Update';
setAttributes(updateBtn, { class: 'customBtn', id: 'updateBtn' });

budgetBtn.addEventListener('click', () => {
  if (totalBudget.value != '') {
    budgetCal();
  } else {
    displayError('.total-budget', 'Please set the total budget');
  }
});

expensesBtn.addEventListener('click', () => {
  if (expenseItem.value && expenseAmount.value) {
    budgetCal();
    appendExpense();

    expenseItem.value = '';
    expenseAmount.value = '';
  } else {
    displayError('.expenses', 'Please fill the expenses');
  }
});

const displayError = (appendTo, errorMsg) => {
  const expensesContainer = document.querySelector(appendTo);
  const errorContainer = document.createElement('p');
  const getlastBefore = expensesContainer.children.length - 1;

  errorContainer.classList.add('error');
  errorContainer.innerHTML = errorMsg;
  if (!expensesContainer.querySelector('.error')) {
    expensesContainer.append(errorContainer);
    expensesContainer.insertBefore(errorContainer, expensesContainer.children[getlastBefore]);
  }

  const budgetContainer = document.querySelector('.budget-calculater');
  budgetContainer.addEventListener('keyup', (e) => {
    if (e.target.parentElement.querySelector('.error')) {
      errorContainer.remove();
    }
  });
};

let getId = null;
let uniqId = 0;
let currentListItem;
let currentListValue;

const appendExpense = () => {
  uniqId++;
  const li = document.createElement('li');
  li.setAttribute('id', 'expense-list-' + uniqId);

  const listedExpenseItem = document.createElement('span');
  listedExpenseItem.classList.add('expense-item');
  listedExpenseItem.innerHTML = expenseItem.value;

  const listedExpenseValue = document.createElement('span');
  listedExpenseValue.classList.add('expense-amount');
  listedExpenseValue.innerHTML = expenseAmount.value;

  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('delete');
  deleteBtn.innerHTML = 'Delete';

  const editBtn = document.createElement('span');
  editBtn.classList.add('edit');
  editBtn.innerHTML = 'Edit';

  li.appendChild(listedExpenseItem);
  li.appendChild(listedExpenseValue);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  expensesList.append(li);

  deleteBtn.addEventListener('click', () => {
    const currentExpense = +totalExpenses.textContent - +li.children[1].textContent;
    const deletedExpense = totalBudget.value - currentExpense;
    balanceAmount.innerHTML = deletedExpense;
    totalExpenses.innerHTML = currentExpense;
    li.remove();
  });

  editBtn.addEventListener('click', (e) => {
    getId = li.getAttribute('id');
    currentListItem = li.querySelector('.expense-item');
    currentListValue = li.querySelector('.expense-amount');

    const currentItemText = currentListItem.textContent;
    const currentAmountText = currentListValue.textContent;

    expenseItem.value = currentItemText;
    expenseAmount.value = currentAmountText;

    if (!expensesContainer.querySelector('#updateBtn')) {
      expensesContainer.append(updateBtn);
    } else {
      updateBtn.style.display = 'block';
    }
    expensesBtn.style.display = 'none';
  });
};

updateBtn.addEventListener('click', () => {
  const getCurrentExpense = +totalExpenses.textContent - +currentListValue.textContent;
  const newExpense = +getCurrentExpense + +expenseAmount.value;
  const currentItem = document.getElementById(getId);
  const currentExpenseName = currentItem.querySelector('.expense-item');
  const currentExpense = currentItem.querySelector('.expense-amount');

  currentExpenseName.innerHTML = expenseItem.value;
  currentExpense.innerHTML = expenseAmount.value;

  totalExpenses.innerHTML = newExpense;
  balanceAmount.innerHTML = +totalBudget.value - newExpense;

  expensesBtn.style.display = 'block';
  updateBtn.style.display = 'none';

  expenseItem.value = '';
  expenseAmount.value = '';
});

const budgetCal = () => {
  let currentExpense = +expenseAmount.value;
  if (+totalExpenses.textContent) {
    currentExpense = +totalExpenses.textContent + +expenseAmount.value;
  }
  totalExpenses.innerHTML = currentExpense;

  let currentBudget = totalBudget.value;
  if (+currentExpense) {
    currentBudget = +totalBudget.value - currentExpense;
  }
  getBudget.innerHTML = !totalBudget.value ? 0 : totalBudget.value;
  balanceAmount.innerHTML = currentBudget;
};

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
