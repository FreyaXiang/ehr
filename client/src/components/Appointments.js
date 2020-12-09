import React, { useState, useEffect } from "react";
import AppointmentCard from "./AppointmentCard";
import AddAppointmentModal from "./AddAppointmentModal";
import SendAppointmentModal from "./SendAppointmentModel";
import "./PageContainer.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "./Loader";

const availableTime = [
  ["Sunday", []],
  [
    "Monday",
    [
      ["14:00 - 14:30", false],
      ["14:30 - 15:00", false],
      ["16:00 - 16:30", false],
      ["17:00 - 17:30", false],
    ],
  ],
  [
    "Tuesday",
    [
      ["14:00 - 14:30", false],
      ["16:00 - 16:30", false],
      ["17:00 - 17:30", false],
    ],
  ],
  [
    "Wednesday",
    [
      ["14:00 - 14:30", false],
      ["14:30 - 15:00", false],
      ["16:00 - 16:30", false],
    ],
  ],
  [
    "Thursday",
    [
      ["14:00 - 14:30", false],
      ["14:30 - 15:00", false],
      ["16:00 - 16:30", false],
      ["17:00 - 17:30", false],
    ],
  ],

  [
    "Friday",
    [
      ["14:00 - 14:30", false],
      ["14:30 - 15:00", false],
      ["16:00 - 16:30", false],
      ["17:00 - 17:30", false],
    ],
  ],
  [
    "Saturday",
    [
      ["14:00 - 14:30", false],
      ["14:30 - 15:00", false],
      ["16:00 - 16:30", false],
      ["17:00 - 17:30", false],
    ],
  ],
];

export default function Appointments(props) {
  const [userInfo, setUserInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
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
      setAppointments(data.appointments);
      setUserInfo(data);
      setLoading(false);
      return data;
    }
    var data = fetchData();
    // setLoading(false);
  }, []);

  console.log(loading);
  const [times, setTimes] = useState(availableTime);

  function handleTimes(day, time) {
    console.log(day + " " + time);
    setTimes((prev) => {
      times[day][1][time][1] = true;
      return times;
    });
  }

  function addAppointment(newAppointment) {
    setAppointments((prev) => {
      return [...prev, newAppointment];
    });
  }

  return (
    <div>
      <div className="page-container">
        <div className="title-container">
          <h4>My Appointments</h4>
          <a
            className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
            href={
              userInfo.role === "staff" || userInfo.role === "staff_low"
                ? "#modal2"
                : "#modal5"
            }
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
            {appointments.length === 0 && (
              <h6 style={{ margin: "40px" }}>
                You don't have any appointments yet.
              </h6>
            )}
            {appointments.map((item, index) => {
              return (
                <AppointmentCard
                  key={index}
                  id={index}
                  info={item}
                  role={userInfo.role}
                />
              );
            })}
          </div>
        )}
      </div>

      <AddAppointmentModal
        onAdd={addAppointment}
        availableTime={times}
        handleTimes={handleTimes}
        staffName={userInfo.name}
        staffEmail={userInfo.email}
        staffID={userInfo._id}
      />
      <SendAppointmentModal
        patientName={userInfo.name}
        patientEmail={userInfo.email}
        patientID={userInfo._id}
      />
    </div>
  );
}
