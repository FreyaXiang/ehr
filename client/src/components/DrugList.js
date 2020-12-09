import React from "react";
import { Link } from "react-router-dom";

const Drug = ({ drug }) => {
  return (
    <li className="col s6 m4">
      <div className="card" style={{ textAlign: "left" }}>
        <div className="card-content">
          <h5 className="card-title">{drug.name}</h5>
          <p>
            <b>Description: </b>
            {drug.description}
          </p>
          <p>
            <b>Dosage: </b>
            {drug.dosage}
          </p>
          <p>
            <b>Side Effects: </b>
            {drug.side_effects}
          </p>
          <p>
            <b>Price(￥): </b>
            {drug.price}
          </p>
        </div>
      </div>
    </li>
  );
};

const DrugList = ({ drugs }) => {
  return (
    <ul className="row" style={{ marginTop: "40px" }}>
      {drugs.map((drug, index) => {
        return <Drug drug={drug} key={index} />;
      })}
    </ul>
  );
};

export default DrugList;
