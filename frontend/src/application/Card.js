import React, { Component } from "react";
import "../static/applicationCss.css";
import toast, { Toaster } from 'react-hot-toast';

const date = [
  {
    class: "1",
    state: "Wish list",
    wordOfDate: "Apply By",
  },
  {
    class: "2",
    state: "Waiting for referral",
    wordOfDate: "Referral before ",
  },
  {
    class: "3",
    state: "Applied",
    wordOfDate: "Applied Date",
  },
  {
    class: "4",
    state: "Rejected",
    wordOfDate: "Applied Date",
  },
];

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditModal: props.showEditModal,
      reminderAdded: false,
    };
  }

  
  handleAddToCalendar = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("I'm here");
    const application_id = this.props.application.id;
    try {
      const response = await fetch(
        `http://localhost:5000/set_reminder/${application_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          },
        }
      );
      if (response.ok) {
        console.log("Reminder set successfully!");
        toast("Reminder added to calendar!");

      } else {
        console.error("Failed to set reminder");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  render() {
    console.log("Props in Card component:", this.props.application.id);
    const dateType = date.find((d) => {
      return d.class === this.props.application.status;
    });
    const isApplyBy = dateType.wordOfDate === "Apply By";
    return (
      <div
        className="card card-col"
        key={this.state.id + "_card"}
        onClick={this.state.showEditModal}
      >
        <Toaster />
        <div className="card-body bg-c-pink order-card">
          <div className="card-action">
            <h6 className="card-title m-b-20" onClick={this.stopPropagation}>
              {this.props.application.jobTitle}
            </h6>
          </div>
          <p
            className="small-content-text small-text m-b-0"
            key={this.props.application.companyName}
          >
            {this.props.application.companyName}
            <br />
            {dateType.wordOfDate}: {this.props.application.date}
            <br />
            {/* Conditionally render Add to Calendar link */}
            {isApplyBy && (
                <a href="#" onClick={this.handleAddToCalendar}>
                  Add to Calendar
                </a>
            )}
            Location: {this.props.application.location}
          </p>
          <a
            href={this.props.application.jobLink}
            class="btn btn-info"
            role="button"
            style={{
              justifyContent: "center",
              display: "flex",
              backgroundColor: "#009970",
            }}
          >
            Job Link
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
