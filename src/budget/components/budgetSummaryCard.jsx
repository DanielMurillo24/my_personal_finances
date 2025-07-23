import { useState, useEffect } from "react";
import { useBudgetStore } from "../../hooks";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import { Input } from ".";

export const BudgetSummaryCard = ({ income, totalSpent }) => {
  const { updateIncome, errorMessage } = useBudgetStore();
  const [localIncome, setLocalIncome] = useState(
    income ? income.toString() : ""
  );
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalIncome(income ? income.toString() : "");
  }, [income]);

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Oops... Something Went Wrong", errorMessage, "error");
    }
  }, [errorMessage]);

  const spentPercent =
    income > 0 ? Math.min((totalSpent / income) * 100, 100) : 0;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleIncomeChange = (value) => {
    const cleanValue = value.replace(/[^0-9.]/g, "");
    setLocalIncome(cleanValue);
  };

  const handleBlur = () => {
    const numericValue = parseFloat(localIncome);
    if (!isNaN(numericValue)) {
      setLocalIncome(numericValue.toString());
    } else {
      setLocalIncome("");
    }
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSaveClick = () => {
    if (localIncome.trim() === "") {
      Swal.fire("Error", "Income can not be empty", "error");
      return;
    }
    const numericValue = parseFloat(localIncome);
    if (!isNaN(numericValue)) {
      updateIncome(numericValue);
    } else {
      Swal.fire("Error", "Please enter a valid number", "error");
    }
  };

  const displayValue = isFocused
    ? localIncome
    : localIncome
    ? formatCurrency(parseFloat(localIncome))
    : "";

  return (
    <div className="card shadow-sm rounded-4 border-0 mt-4">
      <div className="card-header" style={{ backgroundColor: "#28666e" }}>
        <span className="fw-bold text-white">Budget Summary</span>
      </div>

      <div className="card-body">
        <div className="mb-3 d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="incomeInput" className="form-label mb-0">
              Total Income:
            </label>
            <div style={{ maxWidth: "200px" }}>
              <Input
                type="text"
                value={displayValue}
                placeholder="₡0"
                onChange={handleIncomeChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className="form-control"
              />
            </div>
            <button
              onClick={handleSaveClick}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#7c9885",
              }}
            >
              <Save size={24} />
            </button>
          </div>

          <span className="text-end">
            Available: {formatCurrency(income - totalSpent)}
          </span>
        </div>

        <div
          className="progress mt-2"
          style={{ height: "18px", position: "relative" }}
        >
          <div
            className={`progress-bar d-flex align-items-center justify-content-end px-2`}
            role="progressbar"
            style={{
              width: `${spentPercent}%`,
              transition: "width 0.3s ease",
              position: "relative",
              minWidth: "40px",
              backgroundColor: spentPercent < 90 ? "#7c9885" : "#e74c3c",
            }}
            aria-valuenow={spentPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                position: "absolute",
                right: "6px",
              }}
            >
              {spentPercent.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
