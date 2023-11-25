import React, { Component } from 'react'

const date = [
  {
    class: '1',
    state: 'Wish list',
    wordOfDate: 'Apply By'
  }, {
    class: '2',
    state: 'Waiting for referral',
    wordOfDate: 'Referral before '
  }, {
    class: '3',
    state: 'Applied',
    wordOfDate: 'Applied Date'
  }, {
    class: '4',
    state: 'Rejected',
    wordOfDate: 'Applied Date'
  }
]

class Card extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showEditModal: props.showEditModal
    }
  }

  stopPropagation (e) {
    e.stopPropagation()
  }
  handleAddToCalendar = async () => {
    console.log("I'm here")
    const application_id = this.props.application.id; // Ensure this prop exists
    try {
      const response = await fetch(`http://127.0.0.1:3000/set_reminder/${application_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any additional headers or credentials if required
      });
      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Reminder set successfully!');
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to set reminder');
      }
    } catch (error) {
      // Handle fetch error, e.g., show a generic error message
      console.error('Error:', error);
    }
  }
  render () {
    console.log('Props in Card component:', this.props.application.id)
    const dateType = date.find(d => {
      return d.class === this.props.application.status
    });
    const isApplyBy = dateType.wordOfDate === 'Apply By'
    return (
      <div className='card card-col' key={this.state.id + '_card'} onClick={this.state.showEditModal}>
        <div className='card-body'>
          <div className='card-action'>
            <h6 className='card-title' onClick={this.stopPropagation}>
              {this.props.application.jobTitle}
            </h6>
          </div>
          <p className='small-content-text' key={this.props.application.companyName}>
            {this.props.application.companyName}<br />
            {dateType.wordOfDate}: {this.props.application.date}
            <br />
            {/* Conditionally render Add to Calendar link */}
            {isApplyBy && (
              <a href='#' onClick={this.handleAddToCalendar}>Add to Calendar</a>
            )}
          </p>
          <p>Job link: <a href={this.props.application.jobLink} target='_blank' rel='noreferrer' onClick='event.stopPropagation();'>{this.props.application.jobLink}</a></p>
          <p>Location: {this.props.application.location}</p>
        </div>
      </div>
    )
  }
}

export default Card
