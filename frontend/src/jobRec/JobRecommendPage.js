import React, { Component } from "react";
import $ from "jquery";
import "../static/resume.css";

export default class JobRecommendPage extends Component {
  componentDidMount() {
    // fetch the data only after this component is mounted
    this.getFiles();
  }
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileuploadname: "",
      jobRecommendations: {},
    };
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
        this.setState({ fileName: response.getResponseHeader("x-fileName") });
        this.setState({ resumeDownloadContent: message });
      },
    });
  }

  getRecommendation() {
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
        let responseJson = JSON.parse(response)
        this.setState({ jobRecommendations: responseJson });
      },
    });
  }
  componentDidUpdate() {
    console.log(this.state.jobRecommendations);
  }

  render() {
    return (
      <div style={{ marginTop: "10rem" }}>
        <h2>Uploaded Documents</h2>
        <table>
          <tr>
            <th class="tablecol1">Documents</th>
            <th class="tablecol2">Actions</th>
          </tr>
          <tr>
            <td class="tablecol1">{this.state.fileName}</td>
            <td class="tablecol2">
              <button
                id="download"
                onClick={this.getRecommendation.bind(this)}
                type="button"
              >
                Get Job Recommendations
              </button>
            </td>
          </tr>
        </table>
        <h2>Job Recommendations</h2>
        {Object.keys(this.state.jobRecommendations).length > 0 &&
          this.state.jobRecommendations.jobs.map((job, index) => (
            <div key={index}>
              <h3>{job.job_title}</h3>
              <p>{job.company_name}</p>
              <p>{job.career_page}</p>
            </div>
          ))}
      </div>
    );
  }
}
