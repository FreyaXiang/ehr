import React, { useState, useEffect } from "react";
import "./PageContainer.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import axios from "axios";
import jwt_decode from "jwt-decode";
import M from "materialize-css";
import Loader from "./Loader";

const AppointmentDetail = ({ match }) => {
  const [patients, setPatient] = useState({});
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ drugs: "", description: "" });

  const {
    params: { patientEmail },
  } = match;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  // fecth data from api
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.jwtToken;
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      const url = "/api/users/dashboard/findPatientEmail/" + patientEmail;
      const res = await axios.get(url);
      const data = await res.data;
      const url2 = "/api/users/dashboard/" + decoded.id;
      const res2 = await axios.get(url2);
      const data2 = await res2.data;
      setPatient(data);
      setDoctor(data2);
      setLoading(false);
      return data.patients;
    }
    var data = fetchData();
    console.log(data);
  }, []);

  const endAppointment = (e) => {
    e.preventDefault();
    const data = {
      doctorEmail: doctor.email,
      patientEmail: patientEmail,
    };
    axios
      .post("/api/users/endAppointment", data)
      .then((res) => {
        console.log(res.data);
        // alert(res.data);
        M.toast({ html: "Successfully closed" });
      })
      .catch((err) => alert(err));
    // this.props.history.push("/dashboard");
    window.location.replace("http://localhost:3000/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPrescription = {
      doctorName: doctor.name,
      doctorEmail: doctor.email,
      patientEmail: patientEmail,
      descriptions: form.description,
      drugs: form.drugs,
    };
    console.log(newPrescription);
    // sent an post request to api to add prescription
    axios
      .post("/api/users/prescription", newPrescription)
      .then((res) => {
        console.log(res.data);
        // alert(res.data);
        M.toast({ html: "The prescription has been sent to patient" });
      })
      .catch((err) => alert("Add Prescription failed"));
    setForm({ drugs: "", description: "" });
  };

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
        {loading ? (
          <div>
            <Loader loading={loading} />
          </div>
        ) : (
          <div style={{ padding: "0 3% 3%" }}>
            <h4>Appointment With {patients.name}</h4>
            <div className="row">
              <div className="col s6">
                <h5 style={{ textAlign: "left", margin: "30px 20px 0" }}>
                  Personal Basics
                </h5>
                <form style={{ textAlign: "left", padding: "5%" }}>
                  <div style={{ margin: "0 0 15px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Birthday (MM/DD/YYYY)
                    </span>
                    <span>{patients.birth}</span>
                  </div>
                  <div style={{ margin: "0 0 15px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Weight (kg)
                    </span>
                    <span>{patients.weight}</span>
                  </div>
                  <div style={{ margin: "0 0 15px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Height (cm)
                    </span>
                    <span>{patients.height}</span>
                  </div>
                  <div style={{ margin: "0 0 15px" }}>
                    <span style={{ marginRight: "18px", fontSize: "18px" }}>
                      Gender
                    </span>
                    <span>{patients.gender}</span>
                  </div>
                </form>

                <h5 style={{ textAlign: "left", margin: "2% 20px 0" }}>
                  Health Information
                </h5>
                <form style={{ textAlign: "left", padding: "5%" }}>
                  <div style={{ margin: "0 0 15px" }}>
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
                  <div style={{ margin: "0 0 15px" }}>
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
              <div className="card col s6" style={{ marginTop: "30px" }}>
                <div className="card-content">
                  <p style={{ fontSize: "20px" }}>Your Diagnoses</p>
                  <form onSubmit={handleSubmit}>
                    <div className="input-field col s12">
                      <input
                        onChange={handleChange}
                        value={form.description}
                        name="description"
                        type="text"
                      />
                      <label htmlFor="text">Description</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={handleChange}
                        value={form.drugs}
                        name="drugs"
                        type="text"
                      />
                      <label htmlFor="text">Drugs</label>
                    </div>
                    <div
                      className="col s12"
                      style={{ paddingLeft: "11.250px" }}
                    >
                      <button
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          margin: "1rem 1rem 2rem",
                        }}
                        type="submit"
                        className="btn btn-large waves-effect hoverable red darken-3"
                      >
                        Send
                      </button>
                      <a
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          margin: "1rem auto 2rem",
                        }}
                        href="/dashboard"
                        className="btn btn-large waves-effect hoverable red darken-3"
                        onClick={endAppointment}
                      >
                        End
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <h5 style={{ textAlign: "left", margin: "2% 30px 20px" }}>
              Health Records
            </h5>
            <form style={{ textAlign: "left" }}>
              {patients.health_records.length === 0 && (
                <div>This patient doesn't have any health records yet.</div>
              )}
              <div className="row">
                {patients.health_records.map((item, index) => {
                  return (
                    <div className="col s12 m6 l4" key={index}>
                      <div
                        className="card"
                        style={{ textAlign: "left", margin: "10px 10px" }}
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
              </div>
            </form>
          </div>
        )}
      </div>
      {/* <Footer role="staff" /> */}
    </div>
  );
};

export default AppointmentDetail;
