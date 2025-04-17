import {
  Modal,
  Table,
  GreenCircularButton,
  FormAddDesc,
  BudgetModal,
  BudgetSummaryCard,
} from "./";
import { useBudgetStore } from "../../hooks";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import { Trash2 } from 'lucide-react';

import "./dynamicTable.css";

export const DynamicTable = () => {
  const {
    budget,
    records,
    getRecords,
    deleteBudget,
    addRecord,
    updateRecord,
    deleteRecord,
  } = useBudgetStore();

  const { formState, description, amount, onSubmit, onInputChange } = useForm(
    { description: "", amount: "" },
    addRecord
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentRow, setCurrentRow] = useState(null);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const closeBudgetModal = () => setIsBudgetModalOpen(false);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    getRecords();
  }, []);

  const calculateTotalSpent = () => {
    return records.reduce((total, item) => total + item.amount, 0);
  };

  const totalSpent = calculateTotalSpent();
  const income = budget?.income || 0;
  const remainingBalance = income - totalSpent;

  //--------------------------------------------------------------------------------------

  // Función para guardar los cambios en la fila editada
  const handleSave = (updatedItem) => {
    const updateRow = {
      description: updatedItem.description,
      amount: parseInt(updatedItem.amount, 10),
    };
    handleUpdateItem(currentRow, updateRow);
    closeModal(); // Cierra el modal
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

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      await deleteRecord(recordToDelete._id);
      await Swal.fire("Deleted!", "Record has been deleted.", "success");
    }
  };

  //---------------------------------------------------------------------------------------
  const handleDeleteBudget = async () => {
    if (!budget?._id) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete your budget and all its records.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteBudget(budget._id);
      await Swal.fire("Deleted!", "Your budget has been deleted.", "success");
    }
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
        >
          Delete Budget
        </button>
      </div>
    </div>
  );
};
