import { useBudgetStore } from "../../hooks";
import { useState } from "react";
import Modal from "react-modal";
import { Input } from "./Input";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "1rem",
    padding: "2rem",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
  },
};

Modal.setAppElement("#root");

export const BudgetModal = ({ isOpen, onCloseModal }) => {
  const { createBudget } = useBudgetStore();

  const [income, setIncome] = useState("");

  const handleCreate = async () => {
    console.log("Created budget with income:", income);
    await createBudget(Number(income));
    setIncome("");
    onCloseModal();
  };

  const onInputChange = (value) => {
    setIncome(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h2 className="mb-4 text-center">Create New Budget</h2>
      <hr />
      <div className="mb-4 text-center">
        <Input
          className="form-control"
          type="number"
          placeholder="Income"
          value={income}
          onChange={onInputChange}
        />
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-outline-primary rounded-pill px-4"
          onClick={handleCreate}
        >
          Create
        </button>
        <button
          className="btn btn-outline-secondary rounded-pill px-4"
          onClick={onCloseModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
