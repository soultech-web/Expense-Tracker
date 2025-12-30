**# 💸 Expense Tracker App

A modern, fully client-side **Expense Tracker** built with **Vanilla JavaScript**, HTML, and CSS.  
The app allows users to track income and expenses, filter by month, and persist data using `localStorage`.

Built with a **clean architecture mindset**: single source of truth, derived UI, and no frameworks.

---

## 🚀 Features

- ➕ Add income and expense transactions
- 📅 Filter transactions by month
- 💰 Automatic balance, income, and expense calculations
- 💾 Persistent storage using `localStorage`
- 🎨 Clean, responsive UI (desktop & mobile)
- ⚡ Fast, lightweight, no dependencies

---

## 🧠 Architecture Overview

- **Single Source of Truth**: all transactions are stored in one array
- **Derived UI**: totals and lists are recalculated from state
- **Separation of Concerns**:
  - Data handling
  - Rendering
  - UI updates
- **No frameworks** – pure JavaScript for full control


---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript (ES6+)
- Web Storage API (`localStorage`)
- Intl API (`Intl.NumberFormat`)

---

## 📊 How Month Filtering Works

- Dates are stored in ISO format: `YYYY-MM-DD`
- Filtering is done by comparing:
  - `getFullYear()`
  - `getMonth()`
- This ensures accurate filtering across different years

---

## 🔒 Data Persistence

All transactions are saved locally using:

```js
localStorage.setItem('expenses', JSON.stringify(expenses));

