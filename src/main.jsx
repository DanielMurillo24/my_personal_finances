import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


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
