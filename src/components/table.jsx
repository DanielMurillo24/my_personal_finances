
export const Table = ({ items, onEdit, onDelete }) => {
    const calculateAmount = () => {
    return items.reduce((accumulator, item) => accumulator + item.amount, 0)
};

return (
    <table className="table table-striped">
      <thead className="table-dark">
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Amount</th>
          <th scope="col" className="text-nowrap text-center col-auto">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {items.map((item, index) => (
          <tr key={index}>
            <td scope="row">{item.description}</td>
            <td>{item.amount}</td>
            <td className="text-nowrap text-center col-auto">
              <div className="d-inline-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => onEdit(index)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>{calculateAmount()}</td>
          <td colSpan="2"></td>
        </tr>
      </tbody>
    </table>
  );
};
