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
          <p>Doctor: {props.info.doctorName}</p>
          <p>Patient: {props.info.patientName}</p>
          <p>Date: {props.info.date}</p>
        </div>
        {props.role === "staff" && (
          <div className="card-action">
            <a
              className="red-text text-darken-3"
              href={"/appointments/" + props.id}
            >
              Start this appointment
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
