import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import jwt_decode from "jwt-decode";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

import RemediRecord from "../RemediRecord";
import Appointments from "../Appointments";
import Clients from "../Clients";
import InsurancePlan from "../InsurancePlan";
import Messages from "../Messages";
import Patients from "../Patients/Patients";
import Prescriptions from "../Prescriptions";
import Settings from "../Settings";
import Records from "../Records";
import Drugs from "../Drugs";
import Doctors from "../Doctors";
import DashboardCard from "./DashboardCard";

const buttonstyle = {
  margin: "20px 0",
  width: "200px",
};

const sidebar_to_comp = {
  "My Re-medi Health Information": <RemediRecord />,
  Appointments: <Appointments />,
  Prescriptions: <Prescriptions />,
  "Medical Records": <Records />,
  "My Doctors": <Doctors />,
  Settings: <Settings />,
  Messages: <Messages />,
  Clients: <Clients />,
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
    // this.renderSwitch = this.renderSwitch.bind(this);
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
    console.log(this.state);
  }

  handleClick(item) {
    const dashpage = sidebar_to_comp[item];
    console.log(`CLICKED ${item} and rendering to ${sidebar_to_comp[item]}`);
    this.setState({
      dashpagename: item,
      dashpage: dashpage,
    });
  }

  // renderSwitch(dashpage) {
  //   return dashpage === null ? (
  //     <div className="dash-page" style={{ color: "#CCCCCC" }}>
  //       Let's fill out some health forms!
  //     </div>
  //   ) : (
  //     dashpage
  //   );
  // }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        {this.state.loading ? (
          <div>loading...</div>
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
                    <div>
                      <div className="page-container">
                        <h4>
                          <b>Hey there,</b> {user.name.split(" ")[0]}
                          <p className="flow-text grey-text text-darken-1">
                            You are logged into{" "}
                            <span style={{ fontFamily: "monospace" }}>
                              Re-medi
                            </span>{" "}
                            EHR system 👏
                          </p>
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "80px",
                          }}
                        >
                          <DashboardCard
                            title={
                              this.state.role === "patient"
                                ? "DOCTOR"
                                : "PATIENTS"
                            }
                            img="accessible"
                            number={
                              this.state.role === "patient"
                                ? this.state.staff.length
                                : this.state.patients.length
                            }
                          />
                          <DashboardCard
                            title="APPOINTMENTS"
                            img="book_online"
                            number={this.state.appointments.length}
                          />
                          <DashboardCard
                            title="MESSAGES"
                            img="chat"
                            number={this.state.messages.length}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    this.state.dashpage
                  )}
                </div>
              </div>
            </div>
            <Footer role={this.state.role} />
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
