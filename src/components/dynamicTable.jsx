import { useState } from "react"
import { Modal } from "./modal";
import "./dynamicTable.css";


export const DynamicTable = () => {

  const[items, setItems] = useState([])
  const[description, setDescription] = useState('')
  const[amount, setAmount] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  const [modalDescription, setModalDescription] = useState('');
  const [modalAmount, setModalAmount] = useState('');

  const onSubmit = (event) => {
    event.preventDefault()

    const convertedAmount = parseInt(amount, 10);
    
    if (description && amount){
        setItems([...items, {description, amount: convertedAmount }]);
        setDescription('');
        setAmount('');
    } 
  }

  const calculateAmount = () => {
    return items.reduce((accumulator, item) => accumulator + item.amount, 0);
  }
  
  // Función para abrir el modal con la fila seleccionada
  const handleEditClick = (index) => {
    const item = items[index];
    setCurrentRow(index);
    setModalDescription(item.description);
    setModalAmount(item.amount);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalDescription('');
    setModalAmount('');
  };

  // Función para guardar los cambios en la fila editada
  const handleSave = () => {
    const updatedItems = [...items]; // Crea una copia del array de items
    updatedItems[currentRow] = {
      ...updatedItems[currentRow], // Copia el ítem actual
      description: modalDescription,
      amount: parseInt(modalAmount, 10),
    };
    setItems(updatedItems);  // Actualiza las filas
    closeModal();  // Cierra el modal
  };


  //Edita la columna( se reemplaza por modal )
  const editItem = (index) => {
    const newDescription = prompt('Enter New Description:', items[index].description);
    const newAmount = prompt('Enter New Amount:', items[index].amount);
    const newItems = [...items];
    newItems[index] = {description: newDescription, amount: newAmount};
    setItems(newItems);  
  }


  const deleteItem= (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  }

  return (
    <div className="container">
  
        <form onSubmit = { onSubmit } className="form-container">
            <div className="row">
                <div className="col-md-2">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </div>
                <div className="col-md-2">
                    <input 
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-outline-success">Add</button>
                </div>
            </div>
        </form>

            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">
                            Description
                        </th>
                        <th scope="col">
                            Amount
                        </th>
                        <th scope="col">
                            Edit
                        </th>
                        <th scope="col">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        items.map((item, index) => (
                            <tr key={index}>
                                <td scope="row">{item.description}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => handleEditClick(index)}>Edit</button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => deleteItem(index)}>Delete</button>
                                </td>
                            </tr>                         
                        ))
                    }
                            <tr>
                                <td>Total</td>
                                <td>{ calculateAmount() }</td>
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
  )
}
