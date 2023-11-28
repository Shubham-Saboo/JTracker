import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfilePage.css";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

const UserProfile = () => {
  const [profiledata, setProfileData] = useState({});
  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    };

    axios
      .get("http://localhost:5000/users/profile", { headers })
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching application statistics:", error);
      });
  }, []);

  console.log("Print profile data");
  console.log(profiledata);

  // const formatSkills = () => {
  //     let formattedSkills = '';
  //     console.log(profiledata.skills.length)
  //     for (let i = 0; i < profiledata.skills.length; i += 2) {
  //         formattedSkills += `${profiledata.skills[i]}${profiledata.skills[i + 1] ? `, ${profiledata.skills[i + 1]}` : ''}`;
  //         formattedSkills += i + 2 < profiledata.skills.length ? '\n' : '';
  //     }
  //     return formattedSkills;
  // };

  // Prepare data for the bar graph

  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMin: 0, // Force minimum value to 0
        suggestedMax: 10, // Set the maximum value as desired
        stepSize: 1, // Control the step size between ticks
        precision: 0, // Show only integers (no decimals)
      },
    },
  };
  const barChartData = {
    labels: ["Wishlist", "Applied", "Waiting for Referral", "Rejected"],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
        data: [
          profiledata.wishlist || 0,
          profiledata.applied || 0,
          profiledata.waiting_for_referral || 0,
          profiledata.rejected || 0,
        ],
      },
    ],
  };

  return (
    <Grid container spacing={3} className="dashboard-container">
      {/* Left side - User information */}
      <Grid item xs={4}>
        <Card variant="outlined" className="user-info">
          <CardContent>
            <Typography variant="h4">User Profile</Typography>
            <Typography variant="body1">
              Full Name: {profiledata.fullname}
            </Typography>
            <Typography variant="body1">
              Username: {profiledata.username}
            </Typography>
            <Typography variant="body1">
              EmailId: {profiledata.email}
            </Typography>
            <Typography variant="body1">
              Skills:
              <ul>
                {Array.isArray(profiledata.skills) &&
                  profiledata.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
              </ul>
            </Typography>
            <Typography variant="body1">
              Education:
              <ul>
                {Array.isArray(profiledata.edu) &&
                  profiledata.edu.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
              </ul>
            </Typography>
            <Typography variant="body1">
              Work Experience:
              <ul>
                {Array.isArray(profiledata.workExp) &&
                  profiledata.workExp.map((workExp, index) => (
                    <li key={index}>{workExp}</li>
                  ))}
              </ul>
            </Typography>

            {/* Display other user information */}
          </CardContent>
        </Card>
      </Grid>

      {/* Right side - Application Statistics */}
      <Grid item xs={8} container spacing={3}>
        {/* Bar Graph */}
        <Grid item xs={12}>
          <Card variant="outlined" className="cardprofile">
            <CardContent>
              <Typography variant="h4">Application Statistics</Typography>
              <Bar data={barChartData} options={options} />
            </CardContent>
          </Card>
        </Grid>

        {/* Individual statistics cards */}
        {/* You can remove the previous card elements representing individual statistics */}
      </Grid>
    </Grid>
  );
};

export default UserProfile;
