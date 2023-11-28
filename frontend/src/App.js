import "bootstrap/dist/css/bootstrap.min.css";
import "./static/App.css";

import React from "react";
import Sidebar from "./sidebar/Sidebar";
import ApplicationPage from "./application/ApplicationPage";
import SearchPage from "./search/SearchPage";
import LoginPage from "./login/LoginPage";
import ManageResumePage from "./resume/ManageResumePage";
import JobRecommendPage from "./jobRec/JobRecommendPage";
import ResumeBuilder from "./resume/ResumeBuilder";
import CoverLetter from "./resume/CoverLetter";
import Navbar from "./component/Navbar";
import UserProfile from './profile/ProfilePage';import Chatbot from "./ChatBot/Chatbot";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let mapRouter = {
      SearchPage: <SearchPage />,
      ApplicationPage: <ApplicationPage />,
      LoginPage: <LoginPage />,
      ManageResumePage: <ManageResumePage />,
      JobRecommendPage: <JobRecommendPage />,
      ResumeBuilder: <ResumeBuilder />,
      UserProfile: <UserProfile />,
      Chatbot: <Chatbot/>,
      CoverLetter:<CoverLetter/>

    };
    this.state = {
      currentPage: <LoginPage />,
      mapRouter: mapRouter,
      sidebar: false,
    };
    this.sidebarHandler = this.sidebarHandler.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.sidebarHandler();
    }
  }

  sidebarHandler = () => {
    this.setState({
      currentPage: this.state.mapRouter["ApplicationPage"],
      sidebar: true,
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      sidebar: false,
    });
  };

  switchPage(pageName) {
    this.setState({
      currentPage: this.state.mapRouter[pageName],
    });
  }

  render() {
    var app;
    // console.log(this.state.sidebar)
    if (this.state.sidebar) {
      app = (
        <div className="main-page">
          <div className="sidebar">
            <Sidebar switchPage={this.switchPage.bind(this)} />
          </div>
          <div className="main">
            <div>
              <Navbar switchPage={this.switchPage.bind(this)}/>
            </div>
            <div className="content">
              <div className="">
                {/* <h1 className="text-center">My Applications</h1> */}
                {/* <span className="btn-icon ">
                <button className="btn btn-danger btn-icon"><i className="fas fa-plus"></i>&nbsp;New</button>
              </span> */}
              </div>
              {this.state.currentPage}
              <button
                style={{
                  position: "absolute",
                  top: "3.85vh",
                  left: "90vw",
                  // marginRight: "500px",
                  backgroundColor: "#009970",
                }}
                onClick={this.handleLogout}
              >
                Logout
              </button>
              
            </div>
          
          </div>
          <Chatbot/>
        </div>
      );
    } else {
      app = (
        <div className="main-page">
          <div className="main">
            <div className="content">
              {/* <h1 className="text-center" style={{ padding: 0.4 + "em" }}>
                My Applications
              </h1> */}
              <div className=""></div>
              <LoginPage side={this.sidebarHandler} />
            </div>
            
          </div>
        
        </div>
        
      )
      ;
    }
    return app;
  }
}
