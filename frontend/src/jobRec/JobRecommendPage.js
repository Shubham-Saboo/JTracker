import React, { useState, useEffect } from "react";
import $ from "jquery";
import "../static/resume.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
} from "@mui/material";

function JobRecommendPage() {
  const [fileName, setFileName] = useState("");
  const [jobRecommendations, setJobRecommendations] = useState({});
  const [resumeDownloadContent, setResumeDownloadContent] = useState("");

  useEffect(() => {
    // Fetch the data only after this component is mounted
    getFiles();
  }, []);

  const getFiles = () => {
    $.ajax({
      url: "http://localhost:5000/resume",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      xhrFields: {
        responseType: "blob",
      },
      credentials: "include",
      success: (message, textStatus, response) => {
        setFileName(response.getResponseHeader("x-fileName"));
        setResumeDownloadContent(message);
      },
    });
  };

  const getRecommendation = () => {
    $.ajax({
      url: "http://localhost:5000/recommend",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      contentType: "application/json",
      success: (response) => {
        let responseJson = JSON.parse(response);
        setJobRecommendations(responseJson);
      },
    });
  };

  useEffect(() => {
    console.log(jobRecommendations);
  }, [jobRecommendations]);

  return (
    <div style={{ margin: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Uploaded Documents
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Documents</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={getRecommendation}
                  disableElevation
                >
                  Get Job Recommendations
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{fileName}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" style={{ marginTop: "3rem" }} gutterBottom>
        Job Recommendations
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Job Title</strong></TableCell>
              <TableCell align="center"><strong>Name of the company</strong></TableCell>
              <TableCell align="center"><strong>Career Page</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(jobRecommendations).length > 0 &&
              jobRecommendations.jobs.map((job, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{job.job_title}</TableCell>
                  <TableCell align="center">{job.company_name}</TableCell>
                  <TableCell align="center">
                    <a href={job.career_page}>{job.career_page}</a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default JobRecommendPage;
