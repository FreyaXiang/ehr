import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import jwt_decode from "jwt-decode";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import RemediRecord from "../Records/RemediRecord";
import Appointments from "../Appointments/Appointments";
import Messages from "../Messages/Messages";
import Patients from "../Patients/Patients";
import Prescriptions from "../Prescriptions/Prescriptions";
import Records from "../Records/Records";
import Drugs from "../Drugs/Drugs";
import Doctors from "../Doctors/Doctors";
import DashboardCard from "./DashboardCard";
import Loader from "../layout/Loader";

const sidebar_to_comp = {
  "My Re-medi Health Information": <RemediRecord />,
  Appointments: <Appointments />,
  Prescriptions: <Prescriptions />,
  "Medical Records": <Records />,
  "My Doctors": <Doctors />,
  Messages: <Messages />,
  Patients: <Patients />,
  Drugs: <Drugs />,
  Dashboard: null,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: null,
      name: null,
      staff: null,
      messages: null,
      appointments: null,
      patients: null,
      loading: true,
      dashpagename: null,
      dashpage:
        this.props.dashpage === null || this.props.dashpage === undefined
          ? null
          : this.props.dashpage,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.jwtToken;
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    const url = "/api/users/dashboard/" + decoded.id;
    const res = await axios.get(url);
    const data = await res.data;
    this.setState({
      role: data.role,
      name: data.name,
      staff: data.staff,
      appointments: data.appointments,
      messages: data.messages,
      patients: data.patients,
      loading: false,
    });
  }

  handleClick(item) {
    const dashpage = sidebar_to_comp[item];
    console.log(`CLICKED ${item} and rendering to ${sidebar_to_comp[item]}`);
    this.setState({
      dashpagename: item,
      dashpage: dashpage,
    });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        {this.state.loading ? (
          <div>
            <Loader loading={this.state.loading} />
          </div>
        ) : (
          <div>
            <Header role={this.state.role} onLogoutClick={this.onLogoutClick} />
            <Sidebar
              role={this.state.role}
              onClick={this.handleClick}
              selected={this.state.dashpagename}
            />

            <div style={{ height: "75vh" }}>
              <div className="row">
                <div className="dash-page">
                  {this.state.dashpage === null ? (
                    <div className="page-container">
                      <h2
                        style={{
                          marginTop: "125px",
                        }}
                      >
                        <b>Welcome, {user.name.split(" ")[0]} !</b>
                      </h2>
                      {(this.state.role === "patient" ||
                        this.state.role === "staff") && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "50px",
                          }}
                        >
                          <DashboardCard
                            title={
                              this.state.role === "patient"
                                ? "DOCTOR"
                                : "PATIENTS"
                            }
                            img="accessible"
                            role={this.state.role}
                            number={
                              this.state.role === "patient"
                                ? this.state.staff.length
                                : this.state.patients.length
                            }
                          />
                          <DashboardCard
                            role={this.state.role}
                            title="APPOINTMENTS"
                            img="book_online"
                            number={this.state.appointments.length}
                          />
                          <DashboardCard
                            role={this.state.role}
                            title="MESSAGES"
                            img="chat"
                            number={this.state.messages.length}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    this.state.dashpage
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
