import React, { Component } from "react";
import $ from "jquery";
import "../static/resume.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { CloudUpload, GetApp } from "@mui/icons-material";

export default class ManageResumePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "", // To display the uploaded file name
    };

    this.getFiles = this.getFiles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadResume = this.uploadResume.bind(this);
  }

  componentDidMount() {
    this.getFiles(); // Fetch initially uploaded files on component mount
  }

  getFiles() {
    $.ajax({
      url: "http://localhost:5000/resume",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      xhrFields: {
        responseType: "blob",
      },
      success: (message, textStatus, response) => {
        const fileName = response.getResponseHeader("x-fileName");
        this.setState({ fileName: fileName || "No file available" });
      },
      error: (xhr, status, error) => {
        console.error("File fetch error:", xhr.responseText);
        // Handle error scenarios here
      },
    });
  }

  handleChange(event) {
    // To handle file input changes
    const file = event.target.files[0];
    if (file) {
      this.uploadResume(file); // If a file is selected, initiate upload
    }
  }

  uploadResume(file) {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    const uploadUrl = "http://localhost:5000/resume";

    $.ajax({
      url: uploadUrl,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: formData,
      contentType: false,
      processData: false,
      success: (msg) => {
        console.log("Upload successful:", msg);
        this.setState({ fileName: file.name });
        this.getFiles(); // Fetch files after successful upload
      },
      error: (xhr, status, error) => {
        console.error("Upload error:", xhr.responseText);
        // Handle error scenarios here
      },
    });
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
                      onClick={this.getFiles} // Fetch files on download click
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
