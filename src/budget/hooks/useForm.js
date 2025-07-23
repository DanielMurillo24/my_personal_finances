import { useAlert } from "../../hooks";
import { useState } from "react";

export const useForm = (initialForm = {}, onAddRecord, income = 0, totalSpent = 0) => {

  const [formState, setFormState] = useState(initialForm);
  const { showAlert } = useAlert(); 

  const onSubmit = async (event) => {
    event.preventDefault();

    const { description, amount, category } = formState;

    const desc = description?.trim();
    const amt = amount?.toString().trim();
    const cat = category?.trim();
    
    if (!desc || !amt || !cat){
      await showAlert({
        title: 'Invalid Input',
        text: "Values can not be empty",
        icon: "error",
      });
      return;
    }
    const convertedAmount = Number(amt);

    if (isNaN(convertedAmount) || convertedAmount <= 0) {
      await showAlert({
      title: "Invalid Amount",
      text: "Please enter a valid positive number.",
      icon: "error",
    });
    return;
    }

    if ( totalSpent + convertedAmount > income) {
      await showAlert({
        title: "Budget Limit Exceeded",
        text: "Adding this item would exceed your total budget.",
        icon: "error",
      });
      return;
    }  

    if (onAddRecord){
      await onAddRecord(desc, convertedAmount, cat);
      setFormState({
        description: "",
        amount: "",
        category: "",
      });
    }
  };

  const onInputChange = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
  };
};
