import { Input, DropdownCategory } from ".";
import { PlusCircle } from "lucide-react";

export const FormAddDesc = ({
  onSubmit,
  onInputChange,
  description,
  amount,
  category,
  categories = [],
  isDisabled = false,
}) => {
  return (
    <div className="card shadow-sm rounded-4 mt-2">
      <div className="card-header" style={{ backgroundColor: "#28666e" }}>
        <span className="fw-bold text-white">Add New Budget Item</span>
      </div>
      <div className="card-body p-3">
        <form onSubmit={(event) => { if (isDisabled) { event.preventDefault(); return; } onSubmit(event); }} className="card shadow-sm rounded-4 p-3 mt-2">
          <div className="row g-2">
            <div className="col-12 col-md-2">
              <Input
                className="form-control"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(value) => onInputChange("description", value)}
                disabled={isDisabled}
              />
            </div>
            <div className="col-12 col-md-2">
              <Input
                className="form-control"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(value) => onInputChange("amount", value)}
                disabled={isDisabled}
              />
            </div>

            <div className="col-12 col-md-3">
              <DropdownCategory
                categories={categories}
                value={category}
                onChange={(value) => onInputChange("category", value)}
                disabled={isDisabled}
              />
            </div>

            <div className="col d-flex">
              <button
                type="submit"
                disabled={isDisabled}
                style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "#7c9885",
              }}
              >
              <PlusCircle size={24} />
                
              </button>
            </div>
          </div>
          {isDisabled && (
            <div className="mt-3 text-danger fw-bold">
              You can't add more items. You have reached the total budget.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
