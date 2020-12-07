import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import "./PageContainer.css";

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
      console.log(data.staff);
      setDoctors(data.staff);
      setLoading(false);
      return data.staff;
    }
    var data = fetchData();
    console.log(data);
  }, []);

  return (
    <div>
      <div className="page-container" style={{ height: "75vh" }}>
        <div className="title-container">
          <h4>My Doctors</h4>
        </div>
        {loading ? (
          <div style={{ height: "75vh" }}>loading...</div>
        ) : (
          <div className="row" style={{ height: "75vh" }}>
            {doctors.length === 0 && (
              <h6 style={{ margin: "40px" }}>
                You don't have any doctors yet.
              </h6>
            )}
            {doctors.map((item, index) => {
              return (
                <div className="col s6 m4" key={index}>
                  <div className="card" style={doctorCard}>
                    <div className="card-content">
                      <span className="card-title">{item.name}</span>
                      <p>Email: {item.email}</p>
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
