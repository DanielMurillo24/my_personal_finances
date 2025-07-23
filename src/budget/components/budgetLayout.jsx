import { Modal, Table, GreenCircularButton, FormAddDesc, BudgetModal, BudgetSummaryCard } from ".";
import { useBudgetStore, useConfirmAction, useCategoryStore } from "../../hooks";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

import "./budgetLayout.css";

export const BudgetLayout = () => {

  //Hooks
  const { budget, records, errorMessage, getRecords, deleteBudget, addRecord, updateRecord, deleteRecord } = useBudgetStore();
  const { confirmAndRun, isLoading } = useConfirmAction();
  const {categories, getCategories, categoryErrorMessage} = useCategoryStore();

  const calculateTotalSpent = () => {
    return records.reduce((total, item) => total + item.amount, 0);
  };

  //Variables
  const totalSpent = calculateTotalSpent();
  const income = budget?.income || 0;
  const isBudgetFull = totalSpent >= income;

  const { description, amount, category, onSubmit, onInputChange } = useForm({ description: "", amount: "" , category: ""}, addRecord, income, totalSpent );

  // useSate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  //Modals Handlers
  const closeBudgetModal = () => setIsBudgetModalOpen(false);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  } 

  useEffect(() => {
    getRecords();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Oops... Something Went Wrong', errorMessage, 'error');
    }
  }, [errorMessage])

  useEffect(() => {
  if (categoryErrorMessage !== undefined) {
    Swal.fire('Oops... Category Error', categoryErrorMessage, 'error');
  }
}, [categoryErrorMessage]);

  //--------------------------------------------------------------------------------------

  // Función para guardar los cambios en la fila editada
  const handleSave = (updatedItem) => {
    if (!currentItem || !budget?._id || !currentItem._id) return;
    handleUpdateItem(currentItem._id, updatedItem);
    closeModal(); // Close the modal
  };

  //--------------------------------------------------------------------------------------

  // Función para abrir el modal con la fila seleccionada
  const handleEditClick = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  //--------------------------------------------------------------------------------------

  const handleUpdateItem = async (itemId, updatedData) => {
    await updateRecord(budget._id, itemId, updatedData);
  };

  //---------------------------------------------------------------------------------------

  const handleDeleteItem = async (recordId) => {
    const recordToDelete = records.find(r => r._id === recordId);
    if (!recordToDelete) return;

    await confirmAndRun ({
      text: "This will permanently delete the item.",
      successText: "Item deleted successfully.",
      onConfirm: () => deleteRecord(recordId),

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
        category={category}
        categories={categories}
        isDisabled={isBudgetFull}
      />

      <BudgetSummaryCard
        income={income}
        totalSpent={totalSpent}
      />

      <Table
        items={records}
        onEdit={handleEditClick}
        onDelete={(recordId) => handleDeleteItem(recordId)}
      />

      <Modal
        isOpen={isModalOpen}
        description={currentItem?.description || ""}
        amount={currentItem?.amount || ""}
        category={currentItem?.category?._id || ""}
        categories={categories}
        onClose={closeModal}
        onSave={handleSave}
        income={income}
        totalSpent={totalSpent}
        originalAmount={currentItem?.amount || 0}
      />

      <div className="d-flex justify-content-end mt-5">
        <button 
          className="btn btn-outline-danger rounded-pill d-flex align-items-center gap-2 px-4"
          onClick={handleDeleteBudget}
          disabled={isLoading}
        >
          <Trash2 size={24}/>
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
