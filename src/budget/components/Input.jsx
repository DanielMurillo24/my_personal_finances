export const Input = ({type, value = '', placeholder, onChange, className, disabled = false,}) => {

  return (
    <input
    className={ className }
    type = { type }
    placeholder = { placeholder }
    value={ value }
    onChange={ (event) => onChange(event.target.value) }
    disabled={disabled}
    />
  )
};
