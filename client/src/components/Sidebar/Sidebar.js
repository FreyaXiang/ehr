import React, { Component } from "react";
import theme from "../../constants/theme";
import { role_sidebarinfo } from "../../constants/role_sidebars";
import "./Sidebar.css";

export default class Sidebar extends Component {
  render() {
    const sidebarInfo = role_sidebarinfo[this.props.role];

    return (
      <div className="sidebar">
        <ul className="card-collection">
          <li className="collection-item"></li>
          {/*<li>
          <a
            href="/dashboard"
            className="collection-item"
            style={{
              height: '10%',
              color: "white",
              backgroundColor: `${theme.roleColors[this.props.role]["primary"]}`,
            }}
          >
            Dashboard
          </a>
        </li>*/}
          {sidebarInfo.map((item, index) => {
            return (
              <li
                key={index}
                className="collection-item"
                id={this.props.selected === item ? "selected" : "select"}
                style={
                  this.props.selected === item
                    ? {
                        backgroundColor: `${
                          theme.roleColors[this.props.role]["secondary"]
                        }`,
                        color: `${
                          this.props.selected === item
                            ? "#FFFFFF"
                            : theme.roleColors[this.props.role]["primary"]
                        }`,
                        borderColor: `${
                          theme.roleColors[this.props.role]["primary"]
                        }`,
                      }
                    : {
                        color: `${
                          this.props.selected === item
                            ? "#FFFFFF"
                            : theme.roleColors[this.props.role]["primary"]
                        }`,
                        borderColor: `${
                          theme.roleColors[this.props.role]["primary"]
                        }`,
                      }
                }
                onClick={() => {
                  this.props.onClick(item);
                }}
              >
                {item}
              </li>
            );
          })}
          <li className="collection-item" id="fill"></li>
          <li className="collection-item">
            Role:{" "}
            {this.props["role"].charAt(0).toUpperCase() +
              this.props["role"].slice(1)}
          </li>
        </ul>
      </div>
    );
  }
}
