import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AddPatientModal extends Component {
  async componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);
    const token = localStorage.jwtToken;
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    const url = "/api/users/dashboard/" + decoded.id;
    const res = await axios.get(url);
    const data = await res.data;
    this.setState({
      doctorName: data.name,
      doctorEmail: data.email,
    });
  }

  constructor(props) {
    super();
    this.state = {
      email: "",
      comments: "",
      doctorName: null,
      doctorEmail: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      id: jwt_decode(localStorage.jwtToken).id,
      email: this.state.email,
      doctorName: this.state.doctorName,
      doctorEmail: this.state.doctorEmail,
      comments: this.state.comments,
    };
    console.log(newPatient);
    // sent an post request to api to add patient
    axios
      .post("/api/users/patient", newPatient)
      .then((res) => {
        console.log(res.data);
        // alert(res.data);
      })
      .catch((err) => alert("Add patient failed"));
    // this.props.onAdd(newPatient);
    M.toast({ html: "The request has been sent to the patient" });
    this.setState({
      email: "",
      comments: "",
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
          id="modal1"
          className="modal"
          style={{ height: "48%" }}
        >
          <div className="modal-content">
            <h4>Add New Patient</h4>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Patient Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.comments}
                  id="comments"
                  type="text"
                />
                <label htmlFor="email">Comments</label>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="modal-close btn btn-large waves-effect hoverable red darken-3"
                >
                  Add
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

export default AddPatientModal;
