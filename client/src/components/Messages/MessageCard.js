import React from "react";

const msgCard = {
  textAlign: "left",
  margin: "30px 10px",
};

export default function MessageCard(props) {
  return (
    <div className="col s10">
      <div className="card" style={msgCard}>
        <div className="card-content">
          <span className="card-title">
            <b>{props.name}</b>
          </span>
          <p>
            <b>{props.name + " " + props.reason}</b>
          </p>
          <p>
            <b>Messages:</b> {props.comment}
          </p>
        </div>
        <div className="card-action">
          {props.role === "staff" || props.role === "staff_low" ? (
            <div>
              <div
                className="btn white red-text text-darken-3"
                onClick={() => {
                  props.clickConfirm(props.index);
                  props.removeCard(props.index);
                }}
              >
                Known
              </div>
              <div className="btn white red-text text-darken-3">Reply</div>
            </div>
          ) : (
            <div>
              <div
                className="btn white red-text text-darken-3"
                onClick={() => {
                  props.clickAgree(
                    props.index,
                    props.doctorId,
                    props.patientName,
                    props.name,
                    props.patientEmail,
                    props.staffEmail
                  );
                  props.removeCard(props.index);
                }}
              >
                Agree
              </div>
              <div
                className="btn white red-text text-darken-3"
                onClick={() => {
                  props.clickIgnore(props.index);
                  props.removeCard(props.index);
                }}
              >
                Ignore
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
