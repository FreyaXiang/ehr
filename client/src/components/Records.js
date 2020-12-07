import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./PageContainer.css";
import EditRecordsModal from "./EditRecordsModal";
import AddRecordsModal from "./AddRecordsModal";

export default class Records extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthRecords: null,
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
      healthRecords: data.health_records,
      loading: false,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="page-container">
        <div className="title-container" style={{ marginBottom: "4%" }}>
          <h4>My Medical Records</h4>
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
              <div>
                {this.state.healthRecords.map((item, index) => {
                  return <div>{item.description}</div>;
                })}
              </div>
            )}
          </div>
        )}
        <EditRecordsModal />
        <AddRecordsModal />
      </div>
    );
  }
}
