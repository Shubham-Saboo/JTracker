import React, { Component } from "react";
import "../static/applicationCss.css";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Place this line at the top level of your component or entry point
// toast.configure();

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
    };
  }

  stopPropagation(e) {
    e.stopPropagation();
  }
  handleAddToCalendar = async () => {
    console.log("I'm here");
    const application_id = this.props.application.id; // Ensure this prop exists
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/set_reminder/${application_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Add any additional headers or credentials if required
        }
      );
      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("Reminder set successfully!");
        //toast.success("Reminder set successfully!");
      } else {
        // Handle error, e.g., show an error message
        console.error("Failed to set reminder");
        //toast.error("Failed to set reminder");
      }
    } catch (error) {
      // Handle fetch error, e.g., show a generic error message
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
            {/* <a
              href={this.props.application.jobLink}
              target="_blank"
              rel="noreferrer"
              onClick="event.stopPropagation();"
            >
              {this.props.application.jobLink}
            </a> */}
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

      //  <>
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-4 col-xl-3" key={this.state.id + '_card'} onClick={this.state.showEditModal}>
      //         <div className="card bg-c-blue order-card">
      //           <div className="card-block">
      //             <h6 className="m-b-20" onClick={this.stopPropagation}>{this.props.application.jobTitle}</h6>
      //             <h2 className="text-right">
      //               <i className="fa fa-cart-plus f-left" />
      //               <span>486</span>
      //             </h2>
      //             <p className="m-b-0">
      //               Completed Orders<span className="f-right">351</span>
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </>
    );
  }
}

export default Card;
