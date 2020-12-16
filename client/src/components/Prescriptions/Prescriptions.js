import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Loader from "../layout/Loader";
export default class Prescriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: null,
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
      prescriptions: data.prescriptions,
      loading: false,
    });
  }

  render() {
    return (
      <div className="page-container">
        <div className="title-container" style={{ marginBottom: "2%" }}>
          <h4>My Prescriptions</h4>
        </div>
        {this.state.loading ? (
          <div>
            <Loader loading={this.state.loading} />
          </div>
        ) : this.state.prescriptions.length === 0 ? (
          <div>You don't have any prescription yet.</div>
        ) : (
          this.state.prescriptions.map((item, index) => {
            return (
              <div key={index} className="col s12 m6">
                <div
                  className="card"
                  style={{ textAlign: "left", margin: "30px 10px" }}
                >
                  <div className="card-content">
                    <span className="card-title">
                      {item.date.substring(0, 10)}
                    </span>
                    <p>
                      <b>Drugs: </b>
                      {item.drugs}
                    </p>
                    <p>
                      <b>Descriptions: </b>
                      {item.description}
                    </p>
                    <p>
                      <b>Doctor: </b>
                      {item.doctorName}
                    </p>
                    <p>
                      <b>Doctor Email: </b>
                      {item.doctorEmail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
