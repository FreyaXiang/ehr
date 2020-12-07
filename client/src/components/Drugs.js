import React, { useState } from "react";
import axios from "axios";
import DrugSearchForm from "./DrugSearchForm";
import Loader from "./Loader";
import DrugList from "./DrugList";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes`;

  const fetchBooks = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await axios.get(`${API_BASE_URL}?q=${searchTerm}`);
      setBooks(result.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div>
      <div className="page-container">
        <div className="title-container">
          <h4>Find Drugs</h4>
        </div>
        <div style={{ height: "70vh" }}>
          <DrugSearchForm
            onSubmitHandler={onSubmitHandler}
            onInputChange={onInputChange}
            searchTerm={searchTerm}
            error={error}
          />
          <Loader searchTerm={searchTerm} loading={loading} />
          <DrugList books={books} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
