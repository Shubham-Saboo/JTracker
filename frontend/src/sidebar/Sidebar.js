import React, { Component } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "../static/logo.png"; // Import your logo here
import DescriptionIcon from '@mui/icons-material/Description';

const iconMap = {
  ApplicationPage: <DashboardIcon />,
  SearchPage: <SearchIcon />,
  JobRecommendPage: <LocationOnIcon />,
  ManageResumePage: <FolderIcon />,
  ResumeBuilder: <BuildIcon />,
  CoverLetter: <DescriptionIcon />,
  UserProfile: <PersonIcon />,
};

export default class Sidebar extends Component {
  tabNames = {
    ApplicationPage: 'Applications',
    SearchPage: 'Job Search',
    ManageResumePage: 'Manage Resume',
    JobRecommendPage: 'Job Recommender',
    ResumeBuilder: 'Resume Builder',
    UserProfile: 'Profile',
    CoverLetter: 'Cover Letter Builder',
  };

  render() {
    return (
      <Drawer variant="permanent" sx={{ backgroundColor: "rgba(125, 87, 243, 0.8)" }}>
        <div style={{ textAlign: "center", padding: "10px 0", color: "#fff" }}>
          <img src={Logo} alt="Logo" style={{ width: "80px", marginBottom: "10px" }} />
          <div>Application Name</div>
        </div>
        <Divider />
        <List sx={{ paddingTop: "16px" }}>
          {Object.keys(iconMap).map((page, index) => (
            <React.Fragment key={page}>
              <ListItem button onClick={() => this.props.switchPage(page)} sx={{ padding: "12px 24px" }}>
                <ListItemIcon>{iconMap[page]}</ListItemIcon>
                <ListItemText primary={this.tabNames[page]} /> {/* Displaying custom names */}
              </ListItem>
              {index !== Object.keys(iconMap).length - 1 && <Divider />} {/* Add Divider between items */}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
}
