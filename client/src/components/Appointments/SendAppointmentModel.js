import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

class SendAppointmentModal extends Component {
  async componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);
  }

  constructor(props) {
    super();
    this.state = {
      doctor: "",
      idealTime: "",
      doctorEmail: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.jwtToken;
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    const newInfo = {
      id: decoded.id,
      patientName: this.props.patientName,
      doctor: this.state.doctor,
      idealTime: this.state.idealTime,
      doctorEmail: this.state.doctorEmail,
      patientEmail: this.props.patientEmail,
    };

    console.log(newInfo);

    // sent an post request to api to update information
    axios
      .post("/api/users/sendAppointRequest", newInfo)
      .then((res) => {
        console.log(res.data);
        // alert(res.data);
      })
      .catch((err) => alert("Request failed"));
    M.toast({ html: "The request has been sent to the doctor." });
    // this.props.onAdd(newPatient);
    this.setState({
      doctor: "",
      idealTime: "",
      doctorEmail: "",
      errors: {},
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal5"
          className="modal"
        >
          <div className="modal-content">
            <h4>Send Appointment Request</h4>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.doctor}
                  id="doctor"
                  type="text"
                />
                <label htmlFor="idealTime">Doctor Name</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.doctorEmail}
                  id="doctorEmail"
                  type="text"
                />
                <label htmlFor="idealTime">Doctor Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.idealTime}
                  id="idealTime"
                  type="text"
                />
                <label htmlFor="idealTime">
                  Your messages here(ideal time, purpose, etc.)
                </label>
              </div>
              <p>
                Note: You are only allowed to request an appointment in three
                days.
              </p>
              <p>Otherwise the doctor will ignore your request.</p>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="modal-close btn btn-large waves-effect hoverable blue darken-3"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-red btn-flat">
              Cancel
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SendAppointmentModal;
