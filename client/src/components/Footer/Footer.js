import React, { Component } from "react";
import "./Footer.css";
import theme from "../../constants/theme";

export default class Footer extends Component {
  render() {
    return (
      <div
        className="footer"
        style={{
          backgroundColor: `${theme.roleColors[this.props.role]["primary"]}`,
        }}
      >
        <p className="footer-text" id="secondary">
          Platform created by Andrew Lee, Andrew Liu, Xin Xiang, and Zane Fadul.
        </p>
        <p className="footer-text" id="main">
          Re-medi © 2020
        </p>
      </div>
    );
  }
}
