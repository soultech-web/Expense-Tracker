'use strict';
const Doms = (ty) => {
   return document.querySelector(ty);
};
const filter = Doms('.month-selector');
const expenses = Doms('.exp');
const income = Doms('.inc');
const ballance = Doms('.bal');
const exp_Form = Doms('.expense-form');
const exp_decription = Doms('.expDesc');
const exp_Amount = Doms('.expAmo');
const exp_Type = Doms('.expType');
const exp_Purpose = Doms('.expPurp');
const exp_Date = Doms('.expdDte');
const expForm_child = exp_Form.querySelectorAll(['input', '.expType']);
const transactionList = Doms('.transaction-list');

document.addEventListener('DOMContentLoaded', () => {
   //ANCHOR - Loading the Expenses from the storage
   let expense = JSON.parse(localStorage.getItem('expenses')) || [];
   console.log(expense);

   //ANCHOR - Saving Expenses to storage
   const saveExpenses = () => {
      localStorage.setItem('expenses', JSON.stringify(expense));
   };

   //ANCHOR - Foramting Money
   const moneyConvert = (money) => {
      return new Intl.NumberFormat('en-US', {
         currency: 'USD',
         style: 'currency',
      }).format(money);
   };

   //ANCHOR - Displaying the tracker Transaction
   const displayTransactions = (exp) => {
      transactionList.innerHTML = '';
      exp.map((exp) => {
         transactionList.innerHTML += `
        <div class="transaction ${
           exp.type === 'Income' ? 'income' : 'expense'
        }">
            <span class="tag">${exp.type}</span>
            <p class="title">${exp.description}</p>
            <p class="amount">${
               exp.type === 'Income' ? '+' : '-'
            } ${moneyConvert(exp.amount)}</p>
            <p class="date">${exp.date}</p>
        </div>
        `;
      });
   };

   //ANCHOR displayin the cards total,expenses and income
   const updateUi = () => {
      const expTotal = expense
         .filter((exp) => exp.type === 'Expenses')
         .reduce((acc, val) => acc + Number(val.amount), 0);

      const incTotal = expense
         .filter((exp) => exp.type === 'Income')
         .reduce((acc, val) => acc + Number(val.amount), 0);

      const Total = incTotal - expTotal;
      ballance.textContent = moneyConvert(Total) || 0;
      income.textContent = moneyConvert(incTotal) || 0;
      expenses.textContent = moneyConvert(expTotal) || 0;

      //ANCHOR - Calling the Display tran fucn
      displayTransactions(expense);
   };
   updateUi();

   //ANCHOR - Filter logics
   filter.addEventListener('change', (e) => {
      const value = e.target.value;
      const filt = expense.filter((exp) => {
         const da = new Date(exp.date);
         console.log(da);
         return da.getMonth() == value;
      });
      filt.length > 0
         ? displayTransactions(filt)
         : displayTransactions(expense);
   });

   //ANCHOR - Toggeling the expenses purpose
   exp_Purpose.classList.add('hide');
   exp_Type.addEventListener('change', (e) => {
      if (e.target.value === 'Expenses') exp_Purpose.classList.remove('hide');
      else exp_Purpose.classList.add('hide');
   });

   //ANCHOR - Expenses Form Validation
   exp_Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emptyField = Array.from(expForm_child).some(
         (el) => el.value === '',
      );
      if (emptyField) {
         alert('please fill in all fields');
         return;
      }

      const save = {
         id: Date.now(),
         description: exp_decription.value,
         amount: exp_Amount.value,
         type: exp_Type.value,
         purpose: exp_Purpose.value,
         date: exp_Date.value,
      };
      expense.push(save);
      saveExpenses();
      updateUi();
      exp_Form.reset();
   });
});
