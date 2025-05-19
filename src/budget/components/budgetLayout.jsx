import { Modal, Table, GreenCircularButton, FormAddDesc, BudgetModal, BudgetSummaryCard } from ".";
import { useConfirmAction } from "../../hooks/useConfirmAction";
import { useBudgetStore } from "../../hooks";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

import "./budgetLayout.css";

export const BudgetLayout = () => {

  //Hooks
  const { budget, records, errorMessage, getRecords, deleteBudget, addRecord, updateRecord, deleteRecord } = useBudgetStore();
  const { confirmAndRun, isLoading } = useConfirmAction();
  const { formState, description, amount, onSubmit, onInputChange } = useForm(
    { description: "", amount: "" },
    addRecord
  );
  // useSate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  //Modals Handlers
  const closeBudgetModal = () => setIsBudgetModalOpen(false);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Oops... Something Went Wrong', errorMessage, 'error');
    }
  }, [errorMessage])

  const calculateTotalSpent = () => {
    return records.reduce((total, item) => total + item.amount, 0);
  };

  const totalSpent = calculateTotalSpent();
  const income = budget?.income || 0;
  const remainingBalance = income - totalSpent;

  //--------------------------------------------------------------------------------------

  // Función para guardar los cambios en la fila editada
  const handleSave = (updatedItem) => {
    handleUpdateItem(currentRow, updatedItem);
    closeModal(); // Close the modal
  };

  //--------------------------------------------------------------------------------------

  // Función para abrir el modal con la fila seleccionada
  const handleEditClick = (index) => {
    const item = records[index];
    setCurrentRow(index);
    setIsModalOpen(true);
  };

  //--------------------------------------------------------------------------------------

  const handleUpdateItem = async (index, updatedData) => {
    const itemToUpdate = records[index];
    if (!itemToUpdate || !itemToUpdate._id) return;

    const updatedRecord = {
      ...itemToUpdate,
      ...updatedData,
    };

    await updateRecord(budget._id, itemToUpdate._id, updatedRecord);
  };

  //---------------------------------------------------------------------------------------

  const handleDeleteItem = async (index) => {
    const recordToDelete = records[index];
    if (!recordToDelete || !recordToDelete._id) return;

    await confirmAndRun ({
      text: "This will permanently delete the item.",
      successText: "Item deleted successfully.",
      onConfirm: () => deleteRecord(recordToDelete._id),

    })
  };

  //---------------------------------------------------------------------------------------
  const handleDeleteBudget = async () => {
    if (!budget?._id) return;

    await confirmAndRun({
      text: "This will permanently delete your budget and all its records.",
      successText: "Your budget has been deleted.",
      onConfirm: () => deleteBudget(budget._id),
    });
  };

  //---------------------------------------------------------------------------------------

  if (!budget) {
    return (
      <div>
        <GreenCircularButton onClick={() => setIsBudgetModalOpen(true)} />
        <BudgetModal
          isOpen={isBudgetModalOpen}
          onCloseModal={closeBudgetModal}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <FormAddDesc
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        description={description}
        amount={amount}
      />

      <BudgetSummaryCard
        income={income}
        totalSpent={totalSpent}
        remainingBalance={remainingBalance}
      />

      <Table
        items={records}
        onEdit={handleEditClick}
        onDelete={(index) => handleDeleteItem(index)}
      />

      <Modal
        isOpen={isModalOpen}
        description={records[currentRow]?.description || ""}
        amount={records[currentRow]?.amount || ""}
        onClose={closeModal}
        onSave={handleSave}
      />

      <div className="d-flex justify-content-end mt-5">
        <button 
          className="btn btn-outline-danger rounded-pill d-flex align-items-center gap-2 px-4"
          onClick={handleDeleteBudget}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Deleting...
            </>
          ) : ( "Delete Budget")}
        </button>
      </div>
    </div>
  );
};
