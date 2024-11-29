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

  const [modalDescription, setModalDescription] = useState("");
  const [modalAmount, setModalAmount] = useState("");

  //----------------------------------Funciones del Modal -------------------------------
  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalDescription("");
    setModalAmount("");
  };

  // Función para guardar los cambios en la fila editada
  const handleSave = () => {
    const updatedItems = {
      description: modalDescription,
      amount: parseInt(modalAmount, 10),
    };
    updateItem(currentRow, updatedItems);
    closeModal(); // Cierra el modal
  };

  // Función para abrir el modal con la fila seleccionada
  const handleEditClick = (index) => {
    const item = items[index];
    setCurrentRow(index);
    setModalDescription(item.description);
    setModalAmount(item.amount);
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
        description={modalDescription}
        amount={modalAmount}
        setDescription={setModalDescription} // Usa los setters del modal
        setAmount={setModalAmount}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};
