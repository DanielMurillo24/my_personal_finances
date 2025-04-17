import { Pencil, Trash2 } from 'lucide-react'; 

export const Table = ({ items, onEdit, onDelete }) => {
    const calculateAmount = () => {
    return items.reduce((accumulator, item) => accumulator + item.amount, 0)
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: 0, // opcional: quita decimales si no los quieres
  }).format(amount);
};

return (
  <div className="card shadow-sm rounded-4 border-0 mt-4">
      <div className="card-body p-0">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-dark text-white rounded-top">
            <tr>
              <th className="ps-4">📝 Description</th>
              <th>💵 Amount</th>
              <th className="text-center">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id} className="border-bottom">
                <td className="ps-4">{item.description}</td>
                <td>{formatCurrency(item.amount)}</td>
                <td className="text-center">
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-pill d-flex align-items-center gap-1"
                      onClick={() => onEdit(index)}
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill d-flex align-items-center gap-1 ms-2"
                      onClick={() => onDelete(index)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
