import { useBudgetStore } from "../../hooks";
import { Input } from "./Input";

export const FormAddDesc = ({onSubmit, onInputChange, description, amount}) => {

  return (
    <form onSubmit={onSubmit} className="card shadow-sm rounded-4 p-3 mt-4">
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
      <div className="col d-flex justify-content-end">
        <button type="submit" className="btn btn-success rounded-pill px-5">
          Add
        </button>
      </div>
    </div>
  </form>
  );
}
