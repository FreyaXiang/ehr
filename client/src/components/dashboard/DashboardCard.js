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
  return (
    <a style={appointmentCard} href={"/" + props.title.toLowerCase()}>
      <div
        className="card-content"
        style={{
          display: "flex",
          alignItems: "center",
          //   justifyContent: "space-between",
        }}
      >
        <div
          style={{
            color: "#BA001F",
            width: "40%",
          }}
        >
          <i className="small material-icons">{props.img}</i>
        </div>
        <div
          className="red white-text darken-4"
          style={{ padding: "5px", width: "60%" }}
        >
          <h5>7</h5>
          <p>{props.title}</p>
        </div>
      </div>
    </a>
  );
}
