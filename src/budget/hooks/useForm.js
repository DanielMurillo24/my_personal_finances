import { useState } from "react";

export const useForm = (initialForm = {}, onAddRecord) => {

  const [formState, setFormState] = useState(initialForm);

  const onSubmit = async (event) => {
    event.preventDefault();

    const { description, amount } = formState;
    const convertedAmount = parseInt(amount, 10);

    if (description && amount && onAddRecord) {
      await onAddRecord(description, convertedAmount);
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
