import "./dynamicTable.css";

export const Modal = ({ isOpen, description, amount, setDescription, setAmount, onClose, onSave }) => {
    if(!isOpen) return null;

    const onSubmit = (event) => {
        event.preventDefault(); // Prevent page refresh on form submit
        onSave(); // Call the save function passed as a prop
    };

  return (
    <div style={modalStyle}>
         <div style={modalContentStyle}>
         <h2>Editing...</h2>
      <form onSubmit={onSubmit} className="form-container">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-outline-primary">Save</button>
          </div>
          
          <div className="col-md-2 d-grid">
            <button type="button" onClick={onClose} className="btn btn-outline-danger">Cancel</button>
          </div>
          
        </div>
      </form>
    </div>
    </div>
  );
};

const modalStyle = {
    position: 'fixed',  // Ensures the modal stays in view even when the page is scrolled
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background overlay
    display: 'flex',  // Flex to center the modal
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,  // Make sure it's above all other content
  };
  
  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    zIndex: 1001, // Ensure the modal content appears above the overlay
  };