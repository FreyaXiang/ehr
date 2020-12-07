import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./PageContainer.css";
import EditRecordsModal from "./EditRecordsModal";

const formContent2 = ["Allergy", "Disability"];
export default class RemediRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birth: null,
      gender: null,
      height: null,
      weight: null,
      allergy: null,
      disability: null,
      loading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
  }

  changeInfo(newInfo) {
    this.setState({
      height: newInfo,
    });
  }

  async componentDidMount() {
    const token = localStorage.jwtToken;
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    const url = "/api/users/dashboard/" + decoded.id;
    const res = await axios.get(url);
    const data = await res.data;
    this.setState({
      birth: data.birth,
      gender: data.gender,
      height: data.height,
      weight: data.weight,
      allergy: data.allergy,
      disability: data.disability,
      loading: false,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="page-container">
        <div className="title-container">
          <h4>My Re-medi Health Records</h4>
        </div>
        {this.state.loading ? (
          <div style={{ height: "75vh" }}>Loading</div>
        ) : (
          <div>
            <h5 style={{ textAlign: "left", margin: "5% 30px 0" }}>
              Personal Basics
            </h5>
            <a
              className="btn-floating waves-effect blue darken-3 addIcon modal-trigger"
              href="#modal3"
            >
              <i className="material-icons">edit</i>
            </a>
            <form
              onSubmit={this.handleSubmit}
              style={{ textAlign: "left", padding: "5%" }}
            >
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Birthday (MM/DD/YYYY)
                </span>
                <span>{this.state.birth}</span>
              </div>
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Weight (kg)
                </span>
                <span>{this.state.weight}</span>
              </div>
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Height (cm)
                </span>
                <span>{this.state.height}</span>
              </div>
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Gender
                </span>
                <span>{this.state.gender}</span>
              </div>
            </form>

            <h5 style={{ textAlign: "left", margin: "2% 30px 0" }}>
              Health Information
            </h5>
            <a
              className="btn-floating waves-effect blue darken-3 addIcon modal-trigger"
              href="#modal3"
            >
              <i className="material-icons">add</i>
            </a>
            <form
              onSubmit={this.handleSubmit}
              style={{ textAlign: "left", padding: "5%" }}
            >
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Allergy
                </span>
                <span tyle={{ fontSize: "15px" }}>{}</span>
              </div>
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Disability
                </span>
                <span tyle={{ fontSize: "15px" }}>{}</span>
              </div>
            </form>
          </div>
        )}
        <EditRecordsModal changeInfo={this.changeInfo} />
      </div>
    );
  }
}
