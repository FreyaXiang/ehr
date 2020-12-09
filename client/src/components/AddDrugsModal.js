import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AddPatientModal extends Component {
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
      name: "",
      description: "",
      dosage: "",
      sideEffects: "",
      price: "",
      errors: {},
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newDrug = {
      name: this.state.name,
      description: this.state.description,
      dosage: this.state.dosage,
      sideEffects: this.state.sideEffects,
      price: this.state.price,
    };
    console.log(newDrug);
    // sent an post request to api to add patient
    axios
      .post("/api/users/addDrugs", newDrug)
      .then((res) => {
        console.log(res.data);
        // alert(res.data);
      })
      .catch((err) => alert("Add drug failed"));
    // this.props.onAdd(newPatient);
    M.toast({ html: "Successfully added to databse" });
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
          id="modal6"
          className="modal"
          style={{ height: "48%" }}
        >
          <div className="modal-content">
            <h4>Add New Drug</h4>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Drug Name</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.description}
                  id="description"
                  type="text"
                />
                <label htmlFor="text">Drug Description</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.dosage}
                  error={errors.dosage}
                  id="dosage"
                  type="text"
                />
                <label htmlFor="dosage">Dosage</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.sideEffects}
                  error={errors.sideEffects}
                  id="sideEffects"
                  type="text"
                />
                <label htmlFor="sideEffects">Side Effects</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.price}
                  id="price"
                  type="text"
                />
                <label htmlFor="price">Price</label>
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
