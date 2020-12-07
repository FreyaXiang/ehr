import React, { useState, useParams } from "react";
import "./PageContainer.css";

const AppointmentDetail = ({ match }) => {
  const {
    params: { appointmentid },
  } = match;
  return (
    <div>
      <div className="page-container">
        <div className="title-container">
          <h4>My Appointments</h4>
        </div>
        <div>{appointmentid}</div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
