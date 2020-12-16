import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import MessageCard from "./MessageCard";
import Loader from "../layout/Loader";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      role: null,
      messages: null,
      email: null,
      loading: true,
    };
    this.removeCard = this.removeCard.bind(this);
    this.ignore = this.ignore.bind(this);
    this.agree = this.agree.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.jwtToken;
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    const url = "/api/users/dashboard/" + decoded.id;
    const res = await axios.get(url);
    const data = await res.data;
    this.setState({
      messages: data.messages,
      name: data.name,
      role: data.role,
      email: data.email,
      loading: false,
    });
    console.log(this.state.messages);
  }

  async removeCard(id) {
    this.setState((prevState) => ({
      messages: prevState.messages.filter((item, index) => index !== id),
    }));
  }

  async confirm(index) {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const url = "/api/users/messages/" + decoded.id + "*" + index;
    const res = await axios.delete(url);
    alert(res.data);
  }

  async agree(
    index,
    doctorId,
    patientName,
    doctorName,
    patientEmail,
    staffEmail
  ) {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const url =
      "/api/users/messages/" +
      decoded.id +
      "*" +
      doctorId +
      "*" +
      index +
      "*" +
      patientName +
      "*" +
      doctorName +
      "*" +
      patientEmail +
      "*" +
      staffEmail;
    const res = await axios.put(url);
    alert(res.data);
  }

  async ignore(index) {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const url = "/api/users/messages/" + decoded.id + "*" + index;
    const res = await axios.delete(url);
    alert(res.data);
  }
  render() {
    return (
      <div className="page-container">
        <div className="title-container">
          <h4>My Messages</h4>
        </div>
        {this.state.loading ? (
          <div>
            <Loader loading={this.state.loading} />
          </div>
        ) : this.state.messages.length === 0 ? (
          <div style={{ marginTop: "35px" }}>
            You don't have any messages yet.
          </div>
        ) : (
          this.state.messages.map((item, index) => {
            return (
              <MessageCard
                key={index}
                index={index}
                name={item.from}
                reason={item.reason}
                comment={item.comments}
                doctorId={item.userId}
                clickIgnore={this.ignore}
                clickAgree={this.agree}
                removeCard={this.removeCard}
                patientName={this.state.name}
                role={this.state.role}
                clickConfirm={this.confirm}
                patientEmail={this.state.email}
                staffEmail={item.userEmail}
              />
            );
          })
        )}
      </div>
    );
  }
}
