
export const GreenCircularButton = ({ onClick }) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <button
          type="button"
          onClick={onClick}
          className="btn btn-success rounded-circle d-flex justify-content-center align-items-center mx-auto mb-2"
          style={{ width: "80px", height: "80px", fontSize: "2rem" }}
        >
          +
        </button>
        <div className="fw-semibold">Create Budget</div>
      </div>
    </div>
  );
};
