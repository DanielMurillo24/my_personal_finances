import "./modal.css";
import { Input } from "./Input";
import { useEffect, useState } from "react";

export const Modal = ({
  isOpen,
  description,
  amount,
  onClose,
  onSave,
}) => {

  const [modalState, setModalState] = useState({
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (isOpen) {
      setModalState({
        description: description || "",
        amount: amount || "",
      });
    }
  }, [isOpen, description, amount]);
  
  const onInputChange = (name, value) => {
    setModalState({
      ...modalState,
      [name]: value,
    });
  };
  
  const onSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh on form submit
    onSave(modalState); // Send the updated values back to the parent
  };
  
  if (!isOpen) return null;

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
                value={modalState.description}
                onChange={(value) => onInputChange("description", value)}
              />
            </div>
            <div className="col-md-4">
              <Input
                className="form-control"
                type="number"
                placeholder="Amount"
                value={modalState.amount}
                onChange={(value) => onInputChange("amount", value)}
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
