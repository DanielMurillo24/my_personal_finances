import { useState } from "react"

export const InputString = ({onNewAmount}) => {

    const [inputString, setInputString] = useState('');

    const onInputChange = ({ target }) => {
        setInputString( target.value )
    }

    const onSubmit = (event) => {
        event.preventDefault(); 

        if (inputString.trim().length <= 1 ) return;
        
        onNewAmount( inputString.trim() ); 
        setInputString(''); 
    
    }

  return (
    <form onSubmit={ onSubmit }>

        <input 
            type="text" 
            placeholder="Add Amount"
            value={ inputString }
            onChange={onInputChange}
        />
    </form>
  )
}
