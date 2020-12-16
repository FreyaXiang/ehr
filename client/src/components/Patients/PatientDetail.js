import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Loader from "../layout/Loader";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import "../layout/PageContainer.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const PatientDetail = ({ match }) => {
  const [patients, setPatient] = useState({});
  const [loading, setLoading] = useState(true);

  const {
    params: { patientEmail },
  } = match;

  // fecth data from api
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.jwtToken;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      const url = "/api/users/dashboard/findPatientEmail/" + patientEmail;
      const res = await axios.get(url);
      const data = await res.data;
      setPatient(data);
      setLoading(false);
      return data.patients;
    }
    var data = fetchData();
  }, []);

  return (
    <div>
      <Header role="staff" />
      <Sidebar role="staff" selected="Patients" />
      <div className="page-container">
        <div style={{ display: "flex" }}>
          <a href="/dashboard" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            Dashboard
          </a>
        </div>
        {loading ? (
          <div>
            <Loader loading={loading} />
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="col s12 m6">
                <h5 style={{ textAlign: "left", margin: "30px 20px 0" }}>
                  <b>Personal Basics</b>
                </h5>
                <form style={{ textAlign: "left", padding: "5%" }}>
                  <div style={{ margin: "0 0 25px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Birthday (MM/DD/YYYY)
                    </span>
                    <span>{patients.birth}</span>
                  </div>
                  <div style={{ margin: "0 0 25px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Weight (kg)
                    </span>
                    <span>{patients.weight}</span>
                  </div>
                  <div style={{ margin: "0 0 25px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Height (cm)
                    </span>
                    <span>{patients.height}</span>
                  </div>
                  <div style={{ margin: "0 0 25px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Gender
                    </span>
                    <span>{patients.gender}</span>
                  </div>
                </form>
              </div>
              <div className="col s12 m6">
                <h5 style={{ textAlign: "left", margin: "30px 20px 0" }}>
                  <b>Health Information</b>
                </h5>
                <form style={{ textAlign: "left", padding: "5%" }}>
                  <div style={{ margin: "0 0 25px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Allergy
                    </span>
                    {patients.allergies.length === 0 && (
                      <div>
                        This patient doesn't have any allergy records yet.
                      </div>
                    )}
                    {patients.allergies.map((item, index) => {
                      return (
                        <div
                          key={index}
                          tyle={{ fontSize: "17px", marginTop: "8px" }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ margin: "0 0 25px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Disability
                    </span>
                    {patients.disabilities.length === 0 && (
                      <div>
                        This patient doesn't have any disability records yet.
                      </div>
                    )}
                    {patients.disabilities.map((item, index) => {
                      return (
                        <div
                          key={index}
                          tyle={{ fontSize: "17px", marginTop: "8px" }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </form>
              </div>
            </div>
            <h5 style={{ textAlign: "left", margin: "2% 30px 0" }}>
              <b>Health Records</b>
            </h5>
            <form style={{ textAlign: "left", padding: "5%" }}>
              {patients.health_records.length === 0 && (
                <div>This patient doesn't have any health records yet.</div>
              )}
              {patients.health_records.map((item, index) => {
                return (
                  <div className="col s6 m6">
                    <div
                      className="card"
                      style={{ textAlign: "left", margin: "30px 10px" }}
                    >
                      <div className="card-content">
                        <span className="card-title">{index + 1 + "."}</span>
                        <p>{item.date}</p>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          </div>
        )}
      </div>
      {/* <Footer role="staff" /> */}
    </div>
  );
};

export default PatientDetail;
