import React, { Component } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import UserProfile from "../profile/ProfilePage";
import "../static/navbar.css";

class Navbar extends Component {
  handleProfileClick = () => {
    this.props.switchPage("UserProfile") // Navigate to UserProfile component
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <p className="navbar-brand mx-auto">Job Tracker</p>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button className="nav-link" onClick={this.handleProfileClick}>
                    <i className="bi bi-person-circle fs-4 me-3"></i>
                    Profile
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
