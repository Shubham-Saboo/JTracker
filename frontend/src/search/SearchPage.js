import React, { Component } from 'react'
import $ from 'jquery'
import SearchCard from './SearchCard'
import { Button,Grid, TextField, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';


const columns = [
  {
    label: 'Company Name',
    id: 'companyName'
  }, {
    label: 'Job title',
    id: 'jobTitle'
  }, {
    label: 'Location',
    id: 'location'
  }, {
    label: 'Date',
    id: 'date'
  }, {
    label: '',
    id: 'func'
  }
]

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      rows: [],
      salary: '',
      addedList: [],
      showModal: false,
      job: null,
      modalMode: null,
    };
  }

  search () {
    if (!this.state.searchText) {
      window.alert('Search bar cannot be empty!!')
      return
    }
    $.ajax({
      url: 'http://localhost:5000/search',
      method: 'get',
      data: {
        keywords: this.state.searchText,
        salary: this.state.salary
      },
      contentType: 'application/json',
      success: (data) => {
        const res = data.map((d, i) => {
          return {
            id: i,
            jobTitle: d.jobTitle,
            companyName: d.companyName,
            location: d.location,
            date:d.date
          }
        })
        this.setState({
          rows: res
        })
      }
    })
  }

  deleteTheApplication (id) {
    const newRows = this.state.rows.filter(app => {
      return app.id !== id
    })
    const newAddedList = this.state.addedList.filter(app => {
      return app.id !== id
    })
    this.setState({
      rows: newRows,
      addedList: newAddedList
    })
  }

  // open the card modal according to the application in parameter
  showEditModal (job, mode) {
    // console.log(job)
    this.setState({
      showModal: true,
      job: job,
      modalMode: mode
    })
  }

  handleCloseEditModal () {
    this.setState({
      showModal: false,
      job: null
    })
  }

  addToWaitlist (job) {
    const newAddedList = this.state.addedList
    newAddedList.push(job.id)
    // console.log(job)

    $.ajax({
      url: 'http://localhost:5000/applications',
      method: 'POST',
      data: JSON.stringify({
        application: job
      }),
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      contentType: 'application/json',
      success: (msg) => {
        console.log(msg)
        alert('Added item!')
      }
    })
    this.setState({
      addedList: newAddedList
    })
  }

  removeFromWaitlist (job) {
    const newAddedList = this.state.addedList.filter(v => {
      return v !== job.id
    })
    this.setState({
      addedList: newAddedList
    })
  }

  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  setSalary(event) {
    this.setState({ salary: event.target.value });
  }

  render () {
    const { rows, searchText, salary } = this.state;

    let applicationModal = null;
    if (this.state.job) {
      applicationModal = (
        <SearchCard
          show={this.state.showModal}
          submitFunc={this.addToWaitlist.bind(this)}
          mode={this.state.modalMode}
          application={this.state.job}
          handleCloseEditModal={this.handleCloseEditModal.bind(this)}
          deleteApplication={this.deleteTheApplication.bind(this)}
        />
      );
    }

    return (
      <div>
        <div className='container'>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} md={5}>
              <TextField
                id='searchText'
                label='Keyword'
                variant='standard'   
                fullWidth
                value={searchText}
                onChange={this.handleChange.bind(this)}
                InputProps={{
                  disableUnderline: true, // This removes the underline
                  style: { borderBottom: 'none' }, // Additionally, you can set styles here
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Select
                name='salary'
                id='salary'
                value={salary}
                onChange={this.setSalary.bind(this)}
                variant='outlined'
                fullWidth
              >
                <MenuItem value=''>
                  <em>Please select salary range</em>
                </MenuItem>
                <MenuItem value='$50K'>$0K - $50K</MenuItem>
                <MenuItem value='$75K'>$51K - $100K</MenuItem>
                <MenuItem value='$125K'>$101K - $150K</MenuItem>
                <MenuItem value='$175K'>$151K - $200K</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant='contained'
                color='primary'
                onClick={this.search.bind(this)}
                fullWidth
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id + '_th'}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id !== 'func' ? (
                      row[column.id]
                    ) : (
                      <div className='container'>
                        <div className='row'>
                          <div className='col-md-4'>
                            {this.state.addedList.includes(row.id) ? (
                              <Button
                                variant='outlined'
                                onClick={this.removeFromWaitlist.bind(this, row)}
                              >
                                Added
                              </Button>
                            ) : (
                              <Button
                                variant='contained'
                                onClick={this.showEditModal.bind(this, row)}
                              >
                                Add
                              </Button>
                            )}
                          </div>
                          &nbsp;&nbsp;
                          <div className='col-md-2'>
                            <Button
                              variant='contained'
                              style={{ backgroundColor: 'red' }}
                              onClick={this.deleteTheApplication.bind(this, row.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {applicationModal}
      </div>
    );
  }
}
