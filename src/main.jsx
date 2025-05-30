import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { BudgetPage } from "./budget/pages/budgetPage";
import "./styles.css";
import { FinanceApp } from "./FinanceApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <FinanceApp/>
    </HashRouter>
  </React.StrictMode>
);
