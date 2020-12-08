import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../constants/logo_red.svg";

class Landing extends Component {
  render() {
    return (
      <div
        style={{
          height: "75vh",
        }}
        className="container valign-wrapper"
      >
        <div className="row">
          <div className="col s12 center-align">
            <img src={Logo} className="Header-logo" />
            <h2 className="black-text">
              <b>Welcome to Re-medi</b>
            </h2>
            <p className="flow-text grey-text text-darken-1">
              Life-changing and everyday care
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  backgroundColor: "white",
                  color: "black",
                }}
                className="btn btn-large waves-effect waves-light hoverable accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  backgroundColor: "#BA001F",
                  color: "white",
                }}
                className="btn btn-large btn-flat waves-effect "
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
