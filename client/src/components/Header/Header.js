import React, { Component } from "react";
import Logo from "../../constants/logo_red.svg";
import "./Header.css";
import theme from "../../constants/theme";

class Header extends Component {
  render() {
    return (
      <div>
        <div className="Header">
          <a href="/dashboard">
            <img src={Logo} className="Header-logo" />
          </a>
          <div className="logout" onClick={this.props.onLogoutClick}>
            <i className="material-icons right">exit_to_app</i>
            <span>Logout</span>
          </div>
        </div>
        <hr
          style={{
            borderColor: `${theme.roleColors[this.props.role]["primary"]}`,
          }}
        ></hr>
      </div>
    );
  }
}

export default Header;
