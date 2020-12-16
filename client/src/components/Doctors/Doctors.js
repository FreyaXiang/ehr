import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "../layout/Loader";

import "../layout/PageContainer.css";

const doctorCard = {
  textAlign: "left",
  margin: "30px 10px",
};

export default function Doctors(props) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // fecth data from api
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.jwtToken;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      const url = "/api/users/dashboard/" + decoded.id;
      const res = await axios.get(url);
      const data = await res.data;
      setDoctors(data.staff);
      setLoading(false);
      return data.staff;
    }
    var data = fetchData();
  }, []);

  return (
    <div>
      <div className="page-container">
        <div className="title-container">
          <h4>My Doctors</h4>
        </div>
        {loading ? (
          <div>
            <Loader loading={loading} />
          </div>
        ) : (
          <div className="row" style={{ height: "75vh" }}>
            {doctors.length === 0 && (
              <h6 style={{ margin: "40px" }}>
                You don't have any doctors yet.
              </h6>
            )}
            {doctors.map((item, index) => {
              return (
                <div className="col s6" key={index}>
                  <div className="card" style={doctorCard}>
                    <div className="card-content">
                      <span className="card-title">
                        <b>{item.name}</b>
                      </span>
                      <p>
                        <b>Email:</b> {item.email}
                      </p>
                      <p>
                        <b>Department:</b> Inpatient Service(IP)
                      </p>
                      <p>
                        <b>Position:</b> Main Doctor
                      </p>
                    </div>
                    <div className="card-action">
                      <div>
                        <a
                          className="blue-text text-darken-3"
                          style={{ cursor: "pointer" }}
                        >
                          Request Appointment
                        </a>
                      </div>
                      <a
                        className="red-text text-darken-3"
                        style={{ cursor: "pointer" }}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
