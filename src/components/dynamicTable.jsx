import { useState } from "react";
import { Modal } from "./modal";
import "./dynamicTable.css";
import { Input } from "./Input";

export const DynamicTable = () => {
  const [items, setItems] = useState([]);
  const [formValues, setFormValues] = useState({
    description: "",
    amount: "",
  });

  const { description, amount } = formValues;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const [modalDescription, setModalDescription] = useState("");
  const [modalAmount, setModalAmount] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const convertedAmount = parseInt(amount, 10);

    if (description && amount) {
      setItems([...items, { description, amount: convertedAmount }]);
      setFormValues({
        description: "",
        amount: "",
      });
    }
  };

  const calculateAmount = () => {
    return items.reduce((accumulator, item) => accumulator + item.amount, 0);
  };

  //----------------------------------Funciones del Modal -------------------------------
  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalDescription("");
    setModalAmount("");
  };

  // Función para guardar los cambios en la fila editada
  const handleSave = () => {
    const updatedItems = [...items]; // Crea una copia del array de items
    updatedItems[currentRow] = {
      ...updatedItems[currentRow], // Copia el ítem actual
      description: modalDescription,
      amount: parseInt(modalAmount, 10),
    };
    setItems(updatedItems); // Actualiza las filas
    closeModal(); // Cierra el modal
  };

  //---------------------------Termina Funciones del Modal --------------------------------
  // Función para abrir el modal con la fila seleccionada
  const handleEditClick = (index) => {
    const item = items[index];
    setCurrentRow(index);
    setModalDescription(item.description);
    setModalAmount(item.amount);
    setIsModalOpen(true);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const onInputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="form-container">
        <div className="row g-2">
          <div className="col-12 col-md-2">
            <Input
              className="form-control"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(value) => onInputChange("description", value)}
            />
          </div>
          <div className="col-12 col-md-2">
            <Input
              className="form-control"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(value) => onInputChange("amount", value)}
            />
          </div>
          <div className="col-12 col-md-2 d-grid">
            <button type="submit" className="btn btn-outline-success">
              Add
            </button>
          </div>
        </div>
      </form>

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
                    onClick={() => deleteItem(index)}
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
