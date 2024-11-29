import { Input } from "./Input";

export const FormAddDesc = ({onSubmit, onInputChange, description, amount}) => {
    return (
          <form onSubmit={onSubmit} className="form-container">
            <div className="row g-2">
              <div className="col-12 col-md-2">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(value) => onInputChange("description", value)}
                />
              </div>
              <div className="col-12 col-md-2">
                <Input
                  className="form-control"
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(value) => onInputChange("amount", value)}
                />
              </div>
              <div className="col-12 col-md-2 d-grid">
                <button type="submit" className="btn btn-outline-success">
                  Add
                </button>
              </div>
            </div>
          </form>
    );
}
