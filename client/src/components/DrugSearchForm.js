import React from "react";

const DrugSearchForm = ({
  onSubmitHandler,
  searchTerm,
  onInputChange,
  error,
}) => {
  return (
    <form onSubmit={onSubmitHandler}>
      <label className="row">
        <input
          type="search"
          placeholder="Searching for drugs..."
          value={searchTerm}
          onChange={onInputChange}
          required
          style={{ width: "60%", margin: "20px" }}
        />
        <button type="submit" className="btn-floating waves-effect red">
          <i class="large material-icons">search</i>
        </button>
      </label>
      {error && (
        <div style={{ color: `red` }}>
          some error occurred, while fetching api
        </div>
      )}
    </form>
  );
};

export default DrugSearchForm;
