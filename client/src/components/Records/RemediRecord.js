import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../layout/PageContainer.css";
import EditRecordsModal from "./EditRecordsModal";
import AddRecordsModal from "./AddRecordsModal";

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
      allergy: data.allergies,
      disability: data.disabilities,
      loading: false,
    });
  }

  render() {
    return (
      <div className="page-container">
        <div className="title-container" style={{ marginBottom: "4%" }}>
          <h4>My Re-medi Health Information</h4>
        </div>
        {this.state.loading ? (
          <div style={{ height: "75vh" }}>Loading</div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <h5 style={{ textAlign: "left", margin: "auto 30px 0" }}>
                Personal Basics
              </h5>
              <a
                className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
                href="#modal3"
              >
                <i className="material-icons">edit</i>
              </a>
            </div>
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

            <div style={{ display: "flex", justifyContent: "start" }}>
              <h5 style={{ textAlign: "left", margin: "2% 30px 0" }}>
                Health Information
              </h5>
              <a
                className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
                href="#modal4"
              >
                <i className="material-icons">add</i>
              </a>
            </div>
            <form
              onSubmit={this.handleSubmit}
              style={{ textAlign: "left", padding: "5%" }}
            >
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Allergy
                </span>
                {this.state.allergy.length === 0 && (
                  <div>You don't have any allergy records yet.</div>
                )}
                {this.state.allergy.map((item, index) => {
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
              <div style={{ margin: "0 0 25px" }}>
                <span style={{ marginRight: "18px", fontSize: "18px" }}>
                  Disability
                </span>
                {this.state.disability.length === 0 && (
                  <div>You don't have any disability records yet.</div>
                )}
                {this.state.disability.map((item, index) => {
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
        )}
        <EditRecordsModal page="remedi" />
        <AddRecordsModal page="remedi" />
      </div>
    );
  }
}
