import "./modal.css";
import { Input } from "./Input";

export const Modal = ({
  isOpen,
  description,
  amount,
  setDescription,
  setAmount,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const onSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh on form submit
    onSave(); // Call the save function passed as a prop
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editing...</h2>
        <form onSubmit={onSubmit} className="form-container">
          <div className="row g-2">
            <div className="col-md-4">
              <Input
                className="form-control"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </div>
            <div className="col-md-4">
              <Input
                className="form-control"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(value) => setAmount(value)}
              />
            </div>

            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-outline-primary">
                Save
              </button>
            </div>

            <div className="col-md-2 d-grid">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-danger"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
