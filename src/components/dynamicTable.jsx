import { Modal } from "./modal";
import { Table } from "./table";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { FormAddDesc } from "./formAddDesc";

import "./dynamicTable.css";

export const DynamicTable = () => {
  const {
    formState,
    onSubmit,
    onInputChange,
    updateItem,
    deleteItem,
    description,
    amount,
    items,
  } = useForm({
    description: "",
    amount: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  //----------------------------------Funciones del Modal -------------------------------
  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para guardar los cambios en la fila editada
  const handleSave = (updatedItem) => {
    const updateRow = {
      description: updatedItem.description,
      amount: parseInt(updatedItem.amount, 10),
    };
    updateItem(currentRow, updateRow);
    closeModal(); // Cierra el modal
  };

  // Función para abrir el modal con la fila seleccionada
  const handleEditClick = (index) => {
    const item = items[index];
    setCurrentRow(index);
    setIsModalOpen(true);
  };
  //---------------------------Termina Funciones del Modal --------------------------------

  return (
    <div className="container">
      <FormAddDesc
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        description={description}
        amount={amount}
      />

      <Table
        items={items}
        onEdit={handleEditClick}
        onDelete={(index) => deleteItem(index)}
      />

      <Modal
        isOpen={isModalOpen}
        description={items[currentRow]?.description || ""}
        amount={items[currentRow]?.amount || ""}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};
