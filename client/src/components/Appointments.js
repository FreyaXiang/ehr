import React, { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import AddAppointmentModal from "./AddAppointmentModal";
import "./PageContainer.css";

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
      ["14:30 - 15:00", false],
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
      ["17:00 - 17:30", false],
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
  const [appointments, setAppointments] = useState([]);
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
            href="#modal2"
          >
            <i className="material-icons">add</i>
          </a>
        </div>

        <div className="row">
          {appointments.length === 0 && (
            <h6 style={{ margin: "40px" }}>
              You don't have any appointments yet.
            </h6>
          )}
          {appointments.map((item, index) => {
            return <AppointmentCard key={index} id={index} info={item} />;
          })}
        </div>
      </div>

      <AddAppointmentModal
        onAdd={addAppointment}
        availableTime={times}
        handleTimes={handleTimes}
      />
    </div>
  );
}
