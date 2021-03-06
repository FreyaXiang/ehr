import React from "react";

const appointmentCard = {
  width: "31%",
  height: "auto",
  marginBottom: "15px",
  cursor: "pointer",
  backgroundColor: "white",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

export default function DashboardCard(props) {
  var userRole;
  if (props.role === "staff") {
    userRole = "#BA001F";
  } else if (props.role === "patient") {
    userRole = "#094FAD";
  } else {
    userRole = "#BAB100";
  }
  return (
    <a style={appointmentCard} href={"/" + props.title.toLowerCase()}>
      <div
        className="card-content"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: userRole,
            width: "40%",
          }}
        >
          <i className="small material-icons">{props.img}</i>
        </div>
        <div
          className="white-text"
          style={{
            padding: "5px",
            width: "60%",
            backgroundColor: userRole,
          }}
        >
          <h5>{props.number}</h5>
          <p>{props.title}</p>
        </div>
      </div>
    </a>
  );
}
