import React, { Component } from "react";
import UserProfile from "../profile/ProfilePage";
import "../static/navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUser } from "react-icons/fa";

class Navbar extends Component {
  handleProfileClick = () => {
    this.props.switchPage("UserProfile"); // Navigate to UserProfile component
    this.props.switchPage("UserProfile"); // Navigate to UserProfile component
  };

  // handleLogout = () => {

  //     localStorage.removeItem("token");
  //     this.setState({
  //       sidebar: false,
  //     });

  // };

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#388087" }}
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <h2
                className="navbar-brand mx-auto"
                style={{ color: "white", fontSize: "50px" }}
              >
                Job Tracker
              </h2>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={this.handleProfileClick}
                    style={{
                      backgroundColor: "white",
                      height: "47px",
                      width: "47px",
                    }}
                  >
                    <FaUser style={{ color: "black" }} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
