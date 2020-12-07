import React from "react";

const appointmentCard = {
  textAlign: "left",
  margin: "15px",
};

export default function AppointmentCard(props) {
  return (
    <div className="col s12 m6">
      <div className="card" style={appointmentCard}>
        <div className="card-content">
          <span className="card-title">{props.info.name}</span>
          <p>Tel: {props.info.tel}</p>
          <p>Email: {props.info.email}</p>
          <p>{props.info.date}</p>
        </div>
        <div className="card-action">
          <a
            className="red-text text-darken-3"
            href={"/appointments/" + props.id}
          >
            VIEW DETAILS
          </a>
        </div>
      </div>
    </div>
  );
}
