import React from "react";

const appointmentCard = {
  textAlign: "left",
  margin: "15px",
};

export default function AppointmentCard(props) {
  return (
    <div className="col s12 m5">
      <div className="card" style={appointmentCard}>
        <div className="card-content">
          <p>Doctor: {props.info.doctorName}</p>
          <p>Patient: {props.info.patientName}</p>
          <p>Date: {props.info.date}</p>
        </div>
        <div className="card-action">
          {props.role === "staff" && (
            <a
              className="red-text text-darken-3"
              href={"/appointments/doctors/" + props.info.patientEmail}
            >
              Start
            </a>
          )}
          {props.role === "patient" && (
            <a
              className="red-text text-darken-3"
              href={"/appointments/" + props.id}
            >
              Cancel
            </a>
          )}
          {props.role === "staff_low" && (
            <a
              className="red-text text-darken-3"
              href={"/appointments/staff_low/" + props.id}
            >
              Start
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
