import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../layout/PageContainer.css";
import EditRecordsModal from "./EditRecordsModal";
import AddRecordsModal from "./AddRecordsModal";
import Loader from "../layout/Loader";

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
  }

  onAdd(newRecords) {
    this.setState((prevState) => ({
      healthRecords: [...prevState.healthRecords, newRecords],
    }));
  }

  render() {
    return (
      <div className="page-container">
        <div className="title-container">
          <h4>My Medical Records</h4>
          <div>
            <a
              className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
              href="#modal4"
              style={{ marginRight: "20px" }}
            >
              <i className="material-icons">add</i>
            </a>
            {/* <a
              className="btn-floating waves-effect red darken-3 addIcon modal-trigger"
              href="#modal3"
            >
              <i className="material-icons">edit</i>
            </a> */}
          </div>
        </div>
        {this.state.loading ? (
          <div>
            <Loader loading={this.state.loading} />
          </div>
        ) : (
          <div>
            {this.state.healthRecords.length === 0 ? (
              <div style={{ marginTop: "40px" }}>
                You don't have any health records yet.
              </div>
            ) : (
              <div>
                {this.state.healthRecords.map((item, index) => {
                  return (
                    <div className="col s6 m6">
                      <div className="card" style={patientCard}>
                        <div className="card-content">
                          <span className="card-title">
                            <b>
                              {index + 1 + "."} {item.date}
                            </b>
                          </span>
                          <p>{item.description}</p>
                        </div>
                        <div className="card-action">
                          <a className="red-text text-darken-3">Edit</a>
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
