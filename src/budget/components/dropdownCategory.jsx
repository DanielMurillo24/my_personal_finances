export const DropdownCategory = ({ categories = [], value, onChange }) => {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat.categoryName}
        </option>
      ))}
    </select>
  );
};