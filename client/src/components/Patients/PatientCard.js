import React from "react";

const patientCard = {
  textAlign: "left",
  margin: "30px 10px",
};

export default function PatientCard(props) {
  return (
    <div className="col s6 m4">
      <div className="card" style={patientCard}>
        <div className="card-content">
          <span className="card-title">{props.info.name}</span>
          <p>Tel: {props.info.tel}</p>
          <p>Email: {props.info.email}</p>
        </div>
        <div className="card-action">
          <a className="red-text text-darken-3" href={"/patients/" + props.id}>
            MORE DETAILS
          </a>
        </div>
      </div>
    </div>
  );
}
