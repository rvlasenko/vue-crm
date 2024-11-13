# Vue CRM - Home Accounting

Vue CRM is a web application designed for personal finance management. It allows users to track their income and expenses, categorize transactions, and visualize their financial history through charts. The application is built using Vue.js 2 and Firebase, providing an intuitive and responsive user interface.

## Features

- **User Authentication**: Users can register and log in to access their personal accounts.
- **Personal Profile**: Each user has a profile to manage their financial data securely.
- **Dashboard**: Displays current currency balances (RUB, USD, EUR) and available funds.
- **Categories**: Users can create and manage categories to organize their income and expenses.
- **Transaction Records**: Users can add records for both income and expenses, assigning them to the appropriate categories.
- **Charts**: Visual representation of financial history, allowing users to analyze their spending and income trends over time.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/rvlasenko/vue-crm.git
   ```
2. Navigate to the project directory:
   ```bash
   cd vue-crm
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run serve
   ```

## Usage

- **User Registration and Login**: Navigate to the login or registration page to create a new account or access an existing one.
- **Personal Profile**: After logging in, users can view and manage their personal financial data.
- **Creating Categories**: Navigate to the categories section to create new categories for your transactions.
- **Adding Transactions**: Use the provided forms to log your income and expenses, ensuring to select the correct category for each entry.
- **Viewing Charts**: Access the charts section to view your financial history and gain insights into your spending habits.

## Technologies Used

- Vue.js
- Vue Router
- Vuex
- Chart.js (for visualizations)
- Firebase
