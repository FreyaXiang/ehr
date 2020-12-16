import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import AddPatientModal from "./AddPatientModal";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "../layout/Loader";

import "../layout/PageContainer.css";

export default function Patients(props) {
  const [patients, setPatient] = useState([]);
  const [loading, setLoading] = useState(true);

  function addPatient(newPatient) {
    setPatient((prev) => {
      return [...prev, newPatient];
    });
  }

  // fecth data from api
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.jwtToken;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      const url = "/api/users/dashboard/" + decoded.id;
      const res = await axios.get(url);
      const data = await res.data;
      setPatient(data.patients);
      setLoading(false);
      return data.patients;
    }
    var data = fetchData();
    console.log(data);
  }, []);

  console.log(patients);

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
        {loading ? (
          <div>
            <Loader loading={loading} />
          </div>
        ) : (
          <div className="row">
            {patients.length === 0 && (
              <h6 style={{ margin: "40px" }}>
                You don't have any patient yet.
              </h6>
            )}
            {patients.map((item, index) => {
              return <PatientCard key={index} id={index} info={item} />;
            })}
          </div>
        )}
      </div>

      <AddPatientModal onAdd={addPatient} />
    </div>
  );
}
