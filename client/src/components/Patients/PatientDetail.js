import React, { useState, useParams } from "react";
import Header from "../Header/Header";
import "../PageContainer.css";

const PatientDetail = ({ match }) => {
  const {
    params: { patientid },
  } = match;

  return (
    <div>
      <Header role="staff" />
      <div style={{ margin: "60px 10% auto" }}>
        <div style={{ display: "flex" }}>
          <a href="/dashboard" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            Dashboard
          </a>
        </div>
        <div>{patientid}</div>
      </div>
    </div>
  );
};

export default PatientDetail;
