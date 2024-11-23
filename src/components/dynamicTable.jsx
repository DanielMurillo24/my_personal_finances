import { useState } from "react";
import { Modal } from "./modal";
import "./dynamicTable.css";
import { FormAddDesc } from "./formAddDesc";
import { useForm } from "../hooks/useForm";

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

  const handleDeleteItem = (index) => {
    deleteItem(index);
  };

  const calculateAmount = () => {
    return items.reduce((accumulator, item) => accumulator + item.amount, 0);
  };

  return (
    <div className="container">
      <FormAddDesc
        onSubmit={onSubmit}
        onInputChange={onInputChange}
        description={description}
        amount={amount}
      />

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col" className="text-nowrap text-center col-auto ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item, index) => (
            <tr key={index}>
              <td scope="row">{item.description}</td>
              <td>{item.amount}</td>
              <td className="text-nowrap text-center col-auto">
                <div className="d-inline-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>{calculateAmount()}</td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>

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
