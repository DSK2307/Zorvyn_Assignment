# FinDash - Modern SaaS Finance Dashboard

A stunning, responsive, and robust front-end finance dashboard built to demonstrate modern UI/UX principles, structured component design, and elegant state management. Designed as an evaluation project for frontend development.

## 🌟 Core Requirements & Features Implemented

### 1. Dashboard Overview
- **Summary Cards**: Displays Total Balance, Income, and Expenses with elegant automated sparkline variations.
- **Time-Based Visualization**: Contains an active Line Chart mapping income vs expenses over the last 6 months.
- **Categorical Visualization**: Provides a beautiful "Spending Breakdown" half-circle gauge chart in the Insights section, alongside a "Balance Distribution" radial gauge on the primary dashboard.

### 2. Transactions Section
- **Granular Data Table**: A highly functional table detailing Date, Amount, Category, and Type.
- **Filtering & Search**: Live-action search bar filtering by description, category, and amount, along with dedicated dropdown category and type filters.
- **Sorting**: Click any column header to toggle sort order iteratively.
- **Empty States**: If no transactions match the query, a graceful empty UI state is presented to guide the user.

### 3. Role-Based Access Control (RBAC)
- **Role Switcher**: Found directly in the top navigation bar, seamlessly toggle between **`Admin`** and **`Viewer`**.
- **Admin Capabilities**: Can add, edit, and delete transactions. The "New Payments" and "Add Card" buttons are fully visible.
- **Viewer Capabilities**: "Read-Only" mode. Active action bars, the ability to delete transactional records, and data insertion menus are securely isolated and removed from the UI globally.

### 4. Interactive Insights
- Provides a centralized insight space detailing calculated data highlights (such as highest spending categories) alongside active multi-chart representations detailing current financial trends.

### 5. Robust State Management
- Utilizes customized **`React Context`** (`AppContext.jsx`) to powerfully synchronize transactions, active filters, thematic variables, and role permissions globally across all micro-components without prop-drilling or bloat.

## ✨ Optional Enhancements Achieved

- **Local Storage / Data Persistence**: Any newly added/edited metrics securely save to the browser's `localStorage` directly from the Context wrapper. Reloading the browser maintains your ledger seamlessly.
- **Refined Dark Mode**: A globally accessible deep "SaaS-navy" mode that smartly restyles the glossy UI dynamically—configurable via the top navbar sun/moon toggle.
- **Glassmorphism & Animations**: Premium UI micro-interactions, floating blur states (`backdrop-blur`), mesh gradients, and entrance animations utilizing highly optimized CSS `@keyframes`.
- **CSV Data Export functionality**: Simply tap the **Download** button in the dashboard action-bar to actively construct and export the entire transaction ledger into a downloadable `.csv` file.

## ⚙️ How To Run Locally

```bash
# 1. Clone the repository and navigate into the directory
cd zorvyn

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

## 🏗 Architecture & Code Quality

- **Separation of Concerns**: Extracted individual application structures logically into clear directories: `/src/components`, `/src/context`, and `/src/data`.
- **Responsive Layout**: Designed explicitly using Flexboxes, modular CSS grids (`bento design`), and mobile-first viewport scaling mapping, ensuring compatibility across desktop and mobile screens.
- **Component Reusability**: Common components (e.g., metric cards, customized table cells) are parameterized allowing for highly robust reuse without monolithic chunks of JSX.
