import { useState } from "react";
import { InputString } from "./components/inputString";
import { DynamicTable } from "./components/dynamicTable";

export const BudgetPage = () => {

    const [newAmount, setNewAmount] = useState ('')

    const onAddNewAmount = ( newAmount ) => {

        setNewAmount([newAmount]);
    }

  return(
  <>
{/*  

  <h1>Budget Page</h1>
  
  <InputString onNewAmount = { (value) => onAddNewAmount(value)} /> 

    {
      <div>
        { newAmount }
      </div>
    }
*/}
    <DynamicTable/>

  </>
  )
}
