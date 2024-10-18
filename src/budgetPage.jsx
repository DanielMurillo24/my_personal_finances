import { useState } from "react";
import { InputString } from "./components/inputString";
import { DynamicGrid } from "./components/dynamicGrid";

export const BudgetPage = () => {

    const [newAmount, setNewAmount] = useState ('')

    const onAddNewAmount = ( newAmount ) => {

        setNewAmount([newAmount]);
    }

  return(
  <>
    <h1>Budget Page</h1>

    <h2>Label Text --Item Description</h2>

    <h2>Input Number -- Item Amount</h2>
    <InputString onNewAmount = { (value) => onAddNewAmount(value)} />

    {
      <div>
        { newAmount }
      </div>
    }

    <h2>Label Text --Income</h2>

    <h2>Input Number -- Income Amount</h2>

    <h2>Label Text --Balance</h2>

    <h2>Label Text --Calculate Balance</h2>

    <h2>Grid</h2>

    <DynamicGrid/>

    <h2>Label Text --Total</h2>

    <h2>Label Text --Calculate Total</h2>
  </>
  )
}
