import { useState } from "react"

export const DynamicGrid = () => {

  const[items, setItems] = useState([])
  const[description, setDescription] = useState('')
  const[amount, setAmount] = useState('')

  const addItem = () => {
    setItems([...items, {description, amount}]);
    setDescription('');
    setAmount('');
  }
  
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
    <div>
        <h1>Dynamic Grid</h1>
    
        <div>
            <input 
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input 
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={addItem}>Add</button>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Description
                        </th>
                        <th>
                            Amount
                        </th>
                        <th>
                            Edit
                        </th>
                        <th>
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>
                                    <button onClick={() => editItem(index)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteItem(index)}>Delete</button>
                                </td>
                            </tr>                         
                        ))
                    }
                </tbody>
            </table>
        </div>
  )
}
