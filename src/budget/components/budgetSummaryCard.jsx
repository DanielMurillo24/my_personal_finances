// components/BudgetSummaryCard.jsx

export const BudgetSummaryCard = ({ income, totalSpent, remainingBalance }) => {
  const spentPercent =
    income > 0 ? Math.min((totalSpent / income) * 100, 100) : 0;
  const remainingPercent =
    income > 0 ? Math.max((remainingBalance / income) * 100, 0) : 0;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="row mt-4">
      <div className="col-md-4">
        <div className="card shadow-sm rounded-4 border-0">
          <div className="card-header bg-success text-white">Total Income</div>
          <div className="card-body">
            <h5 className="card-title">{formatCurrency(income)}</h5>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm rounded-4 border-0">
          <div className={`card-header ${
              totalSpent < income ? "bg-primary" : "bg-danger"
            } text-white`}>Total Spent</div>
          <div className="card-body">
            <h5 className="card-title">{formatCurrency(totalSpent)}</h5>
            <div className="progress mt-3" style={{ height: "10px" }}>
              <div
                className={`progress-bar ${
                    totalSpent < income ? "bg-primary" : "bg-danger"
                  }`}
                role="progressbar"
                style={{ width: `${spentPercent}%` }}
                aria-valuenow={spentPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <small className="text-muted">
              {spentPercent.toFixed(0)}% used
            </small>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm rounded-4 border-0">
          <div
            className={`card-header ${
              remainingBalance > 0 ? "bg-warning" : "bg-danger"
            } text-white`}
          >
            Remaining
          </div>
          <div className="card-body">
            <h5 className="card-title">{formatCurrency(remainingBalance)}</h5>
            <div className="progress mt-3" style={{ height: "10px" }}>
              <div
                className={`progress-bar ${
                  remainingBalance > 0 ? "bg-warning" : "bg-danger"
                }`}
                role="progressbar"
                style={{ width: `${remainingPercent}%` }}
                aria-valuenow={remainingPercent}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <small className="text-muted">
              {remainingPercent.toFixed(0)}% remaining
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
