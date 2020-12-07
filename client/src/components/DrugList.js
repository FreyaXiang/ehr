import React from "react";
import { Link } from "react-router-dom";

const Drug = ({ book }) => {
  return (
    <li className="col s11 m6">
      <div className="card">
        <div className="card-img">
          <img
            alt={`${book.volumeInfo.title} book`}
            src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
          />
          <h3 className="card-title">{book.volumeInfo.title}</h3>
        </div>
        <div className="card-content">
          <p>{book.volumeInfo.authors}</p>
          <p>{book.volumeInfo.publishedDate}</p>
        </div>
      </div>
    </li>
  );
};

const DrugList = ({ books }) => {
  return (
    <ul className="row" style={{ marginTop: "40px" }}>
      {books.items.map((book, index) => {
        return <Drug book={book} key={index} />;
      })}
    </ul>
  );
};

export default DrugList;
