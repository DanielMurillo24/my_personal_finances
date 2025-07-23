import { Input, DropdownCategory } from ".";
import { useAlert } from "../../hooks";
import { useEffect, useState } from "react";

import "./modal.css";

export const Modal = ({
  isOpen,
  description,
  amount,
  category,
  categories = [],
  onClose,
  onSave,
  income,
  totalSpent,
  originalAmount = 0,
}) => {
  const [modalState, setModalState] = useState({
    description: "",
    amount: "",
    category: "",
  });

  const { showAlert } = useAlert();

  useEffect(() => {
    if (isOpen) {
      setModalState({
        description: description || "",
        amount: amount || "",
        category: category || "",
      });
    }
  }, [isOpen, description, amount, category]);

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
    const originalCategory = category || "";
    const selectedCategory = modalState.category || originalCategory;

    if (!description || !amountStr || !selectedCategory) {
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

    const newTotal = totalSpent - originalAmount + parsedAmount;

    if (newTotal > income) {
    await showAlert({
      title: "Budget Exceeded",
      text: "This change would exceed your total income.",
      icon: "error",
    });
    return;
  }

    onSave({
      description,
      amount: parsedAmount,
      category: selectedCategory,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content card shadow-sm rounded-4 p-4">
        <h2 className="modal-title">Edit Record</h2>
        <form onSubmit={onSubmit} className="modal-form">
          <Input
            className="modal-input"
            type="text"
            placeholder="Description"
            value={modalState.description}
            onChange={(value) => onInputChange("description", value)}
          />

          <Input
            className="modal-input"
            type="number"
            placeholder="Amount"
            value={modalState.amount}
            onChange={(value) => onInputChange("amount", value)}
          />

          <DropdownCategory
            className="modal-dropdown"
            categories={categories}
            value={modalState.category}
            onChange={(value) => onInputChange("category", value)}
          />

          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary btn-rounded">
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary btn-rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};