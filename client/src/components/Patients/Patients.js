import React, { useState } from "react";
import PatientCard from "./PatientCard";
import AddPatientModal from "./AddPatientModal";
import { getPeopleList } from "../../actions/authActions";
import "./PageContainer.css";

const patientInfo = [];

//{ name: "Alice Chen", Tel: "123445677", Email: "abc@xxx.com" },
// { name: "Bob Lee", Tel: "123445677", Email: "abc@xxx.com" },
// { name: "Tom Liu", Tel: "123445677", Email: "abc@xxx.com" },

export default function Patients(props) {
  const [patients, setPatient] = useState(patientInfo);

  function addPatient(newPatient) {
    setPatient((prev) => {
      return [...prev, newPatient];
    });
  }

  return (
    <div>
      <div className="page-container">
        <div className="title-container">
          <h4>My Patients</h4>
          <a
            className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
            href="#modal1"
          >
            <i className="material-icons">add</i>
          </a>
        </div>

        <div className="row">
          {patients.length === 0 && (
            <h6 style={{ margin: "40px" }}>You don't have any patient yet.</h6>
          )}
          {patients.map((item, index) => {
            return <PatientCard key={index} id={index} info={item} />;
          })}
        </div>
      </div>

      <AddPatientModal onAdd={addPatient} />
    </div>
  );
}
