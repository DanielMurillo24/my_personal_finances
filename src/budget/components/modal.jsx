import "./modal.css";
import { Input } from "./Input";
import { useAlert } from "../../hooks"; 
import { useEffect, useState } from "react";

export const Modal = ({ isOpen, description, amount, onClose, onSave }) => {
  const [modalState, setModalState] = useState({
    description: "",
    amount: "",
  });

  const { showAlert } = useAlert();

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

  const onSubmit = async (event) => {
    event.preventDefault(); 

    const description = modalState.description?.trim();
    const amountStr = modalState.amount?.toString().trim();
    const parsedAmount = Number(amountStr);

    if (!description || !amountStr) {
    await showAlert({
      title: "Invalid Input",
      text: "Values can not be empty",
      icon: "warning",
    });
    return;
  }

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    await showAlert({
      title: "Invalid Input",
      text: "Please enter a valid positive number.",
      icon: "error",
    });
    return;
  }

  onSave({
    description,
    amount: parsedAmount,
  });
  
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="card shadow-sm rounded-4 p-4 modal-content">
        <h2 className="card-header bg-light text-dark mb-4">Editing...</h2>
        <form onSubmit={onSubmit}>
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

            <div className="col-md-4 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-outline-primary rounded-pill w-100"
              >
                Save
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline-secondary rounded-pill w-100"
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
