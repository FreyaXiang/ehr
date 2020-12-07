import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

class EditRecordsModal extends Component {
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
      item: "",
      changes: "",
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
      item: this.state.item,
      changes: this.state.changes,
    };

    console.log(newInfo);

    // sent an post request to api to update information
    axios
      .post("/api/users/updateBasics", newInfo)
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((err) => alert("Edit Information failed"));
    // this.props.onAdd(newPatient);
    this.setState({
      item: "",
      changes: "",
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
          id="modal3"
          className="modal"
        >
          <div className="modal-content">
            <h4>Edit Your Health Information</h4>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.item}
                  error={errors.item}
                  id="item"
                  type="text"
                />
                <label htmlFor="item">What you want to change</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.changes}
                  id="changes"
                  type="text"
                />
                <label htmlFor="changes">Your changes here</label>
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
                  className="modal-close btn btn-large waves-effect hoverable blue darken-3"
                >
                  Save
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

export default EditRecordsModal;
