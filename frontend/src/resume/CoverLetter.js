import React, { Component } from 'react';
import { TextField, Grid, Button, Typography, Link, } from '@mui/material';
import styles from './styles.module.css';

class CoverLetter extends Component {
  constructor(props) {
    super(props);

    this.state = {
        company: '',
        role: '',
        skill1: '',
        skill2: '',
        downloadLink: null,
        buttonVisible: false,
        linkClicked: false,
        formSubmitted: false,
      };
    }

    handleInputChange = (field, value) => {
      this.setState({ [field]: value });
    };

  handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch data or perform actions to generate cover letter
    // Example: call an API to generate cover letter text based on certain criteria
    const formData = {
        company: this.state.company,
        role: this.state.role,
        skill1: this.state.skill1,
        skill2: this.state.skill2,
      };

    try {
      // Make a fetch call to your cover letter generation API
      console.log(formData)
      const response = await fetch('http://localhost:5000/coverletter', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json'
          },
        // Add any necessary payload or data for generating the cover letter
        
        body: JSON.stringify(formData),
      });

      if (response.ok && response.headers.get('Content-Type') === 'application/msword') {
        // Convert the response to a Blob
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        this.setState({ downloadLink: url,          buttonVisible: true,
          formSubmitted: true,           linkClicked: false, });

      } else {
        console.error('Failed to submit form:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

    linkClickHandler = () => {
    this.setState({ linkClicked: true });
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form style={{ textAlign: 'left'}} onSubmit={this.handleSubmit} className={styles['download-form']}>
        {!this.state.linkClicked && this.state.downloadLink && (
  <Button
    variant="contained"
    color="primary"
    size="large"
    component="a"
    href={this.state.downloadLink}
    download="CoverLetter.docx"
    onClick={this.linkClickHandler}
    style={{ marginTop: '20px' }}
  >
    Download Cover Letter
  </Button>
)}
          <div style={{ marginBottom: '10px'}}>
            <div style={{ marginBottom: '10px', marginTop: '10px' }}>
              <h1>Build Your Cover Letter</h1></div>
          </div>
          <div style={{ marginBottom: '50px' }}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="company">Company:</label>
              <input
                type="text"
                id="company"
                name="company"
                value={this.state.company}
                onChange={(e) => this.handleInputChange('company', e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={this.state.role}
                onChange={(e) => this.handleInputChange('role', e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="skill1">Skill1:</label>
              <input
                type="text"
                id="skill1"
                name="skill1"
                value={this.state.skill1}
                onChange={(e) => this.handleInputChange('skill1', e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="skill2">Skill2:</label>
              <input
                type="text"
                id="skill2"
                name="skill2"
                value={this.state.skill2}
                onChange={(e) => this.handleInputChange('skill2', e.target.value)}
              />
            </div>
          </div>
          <Grid container justifyContent="center">
          <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: '100px', marginTop: '-50px' }}
          >
          Submit
          </Button>
          </Grid>
        </form>
      </div>

    );
  }
}


export default CoverLetter;
