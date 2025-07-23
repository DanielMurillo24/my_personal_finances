import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export const Table = ({ items, onEdit, onDelete }) => {
  const calculateAmount = () => {
    return items.reduce((accumulator, item) => accumulator + item.amount, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0, // opcional: quita decimales si no los quieres
    }).format(amount);
  };

  const groupedByCategory = items.reduce((acc, item) => {
    const categoryName = item.category?.categoryName || "Uncategorized";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  return (
    <div className="card shadow-sm rounded-4 border-0 mt-4">
      <div className="card-header" style={{ backgroundColor: "#28666e" }}>
        <span className="fw-bold text-white">Budget List</span>
      </div>

      <div className="card-body p-0">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-dark text-white rounded-top">
            <tr>
              <th className="ps-4">Description</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedByCategory).map(
              ([categoryName, records]) => (
                <React.Fragment key={categoryName}>
                  <tr className="table-secondary ">
                    <td colSpan={3} className="fw-bold ps-4">
                      {categoryName}
                    </td>
                  </tr>

                  {records.map((item, index) => (
                    <tr key={item._id} className="border-bottom">
                      <td className="ps-4">{item.description}</td>
                      <td>{formatCurrency(item.amount)}</td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            onClick={() => onEdit(item)}
                            title="Edit"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              color: "#7c9885",
                            }}
                          >
                            <Pencil size={24} />
                          </button>
                          <button
                            onClick={() => onDelete(item._id)}
                            title="Delete"
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                              cursor: "pointer",
                              color: "#7c9885",
                            }}
                          >
                            <Trash2 size={24} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}

                  <tr className="table-light fw-semibold">
                    <td className="ps-4">Subtotal</td>
                    <td>{formatCurrency(records.reduce((acc, item) => acc + item.amount, 0))}</td>
                    <td></td>
                  </tr>
                </React.Fragment>
              )
            )}
            <tr>
              <td colSpan={3} style={{ backgroundColor: "#28666e", color: "white" }}></td>
            </tr>

            <tr className="fw-bold bg-light">
              <td className="ps-4">Total</td>
              <td>{formatCurrency(calculateAmount())}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
