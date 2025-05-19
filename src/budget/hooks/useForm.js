import { useAlert } from "../../hooks";
import { useState } from "react";

export const useForm = (initialForm = {}, onAddRecord) => {

  const [formState, setFormState] = useState(initialForm);
  const { showAlert } = useAlert(); 

  const onSubmit = async (event) => {
    event.preventDefault();

    const { description, amount } = formState;

    const desc = description?.trim();
    const amt = amount?.toString().trim();
    
    if (!desc || !amt){
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

    if (onAddRecord){
      await onAddRecord(desc, convertedAmount);
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

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
  };
};
