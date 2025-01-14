import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [items, setItems] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();

    const { description, amount } = formState;

    const convertedAmount = parseInt(amount, 10);

    if (description && amount) {
      setItems([...items, { description, amount: convertedAmount }]);
      setFormState({
        description: "",
        amount: "",
      });
    }
  };

  const onInputChange = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const updateItem = (index, newItem) => {
    const updatedItems = [...items];
    updatedItems[index] = newItem;
    setItems(updatedItems);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems); // Borra el ítem seleccionado
  };

  return {
    ...formState,
    formState,
    items,
    onSubmit,
    onInputChange,
    updateItem,
    deleteItem,
  };
};
