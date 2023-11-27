import React, { Component } from "react";
import $ from "jquery";
import "../static/resume.css";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Grid } from "@mui/material";
import { CloudUpload, GetApp } from "@mui/icons-material";

export default class ManageResumePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileuploadname: "",
    };

    console.log("***");
    console.log(localStorage.getItem("token"));
    this.getFiles.bind(this);
  }

  getFiles() {
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
        console.log(response.getResponseHeader("x-fileName"));
        this.setState({ fileName: response.getResponseHeader("x-fileName") });
        this.setState({ resumeDownloadContent: message });
      },
    });
  }
  handleChange(event) {
    var name = event.target.files[0].name;
    console.log(`Selected file - ${event.target.files[0].name}`);
    this.setState({ fileuploadname: name });
  }

  uploadResume() {
    this.setState({ fileName: this.state.fileuploadname });
    console.log(this.value);
    const fileInput = document.getElementById("file").files[0];
    //console.log(fileInput);

    let formData = new FormData();
    formData.append("file", fileInput);
    //console.log(formData);

    $.ajax({
      url: "http://localhost:5000/resume",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      success: (msg) => {
        console.log(msg);
      },
    });
  }

  downloadResume() {
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
      success: (message, textStatus, response) => {
        console.log(message);
        console.log(textStatus);
        console.log(response);

        var a = document.createElement("a");
        var url = window.URL.createObjectURL(message);
        a.href = url;
        a.download = "resume.pdf";
        document.body.append(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
    });
  }

  componentDidMount() {
    // fetch the data only after this component is mounted
    this.getFiles();
  }

  render() {
    return (
      <Box mt={4} mx={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <input
              id="file"
              name="file"
              type="file"
              style={{ display: "none" }}
              onChange={this.handleChange}
            />
            <label htmlFor="file">
              <Button
                variant="contained"
                component="span"
                fullWidth
                startIcon={<CloudUpload />}
              >
                Upload Resume
              </Button>
            </label>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Uploaded Documents
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{this.state.fileName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<GetApp />}
                      onClick={this.downloadResume}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
  }
}