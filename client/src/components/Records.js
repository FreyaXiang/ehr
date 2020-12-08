import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./PageContainer.css";
import EditRecordsModal from "./EditRecordsModal";
import AddRecordsModal from "./AddRecordsModal";

const patientCard = {
  textAlign: "left",
  margin: "30px 10px",
};

export default class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthRecords: null,
      loading: true,
    };
    this.onAdd = this.onAdd.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.jwtToken;
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    const url = "/api/users/dashboard/" + decoded.id;
    const res = await axios.get(url);
    const data = await res.data;
    this.setState({
      healthRecords: data.health_records,
      loading: false,
    });
    console.log(this.state);
  }

  onAdd(newRecords) {
    this.setState((prevState) => ({
      healthRecords: [...prevState.healthRecords, newRecords],
    }));
  }

  render() {
    return (
      <div className="page-container">
        <div className="title-container" style={{ marginBottom: "4%" }}>
          <h4>My Medical Records</h4>
          <div>
            <a
              className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
              href="#modal4"
            >
              <i className="material-icons">add</i>
            </a>
            <a
              className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
              href="#modal3"
            >
              <i className="material-icons">edit</i>
            </a>
          </div>
        </div>
        {this.state.loading ? (
          <div style={{ height: "75vh" }}>Loading</div>
        ) : (
          <div>
            {this.state.healthRecords.length === 0 ? (
              <div style={{ height: "75vh" }}>
                You don't have any health records yet.
              </div>
            ) : (
              <div style={{ height: "75vh" }}>
                {this.state.healthRecords.map((item, index) => {
                  return (
                    <div className="col s6 m6">
                      <div className="card" style={patientCard}>
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
            )}
          </div>
        )}
        <EditRecordsModal page="healthRecords" />
        <AddRecordsModal page="healthRecords" onAdd={this.onAdd} />
      </div>
    );
  }
}
