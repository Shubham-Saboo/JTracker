import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import './UserProfilePage.css';

const UserProfile = () => {
    // const [profiledata, setUserData] = useState({});
    const [profiledata, setprofiledata] = useState({});
    useEffect(() => {
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          };
        // Fetch application statistics
        console.log('hersdasdsdasd')
        axios.get('http://localhost:5000/users/profile', { headers })
            .then(response => {
                setprofiledata(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching application statistics:', error);
            });
    }, []);
    return (
        <div className="profile-container">
            {/* Left half: User information */}
            <div className="cardprofile user-info">
                <h2>User Profile</h2>
                <p>Full Name: {profiledata.fullname}</p>
                <p>Username: {profiledata.username}</p>
                {/* Display other user information */}
            </div>

            {/* Right half: Application Statistics */}
            <div className="app-stats">
                <h2>Application Statistics</h2>
                <div className="cardprofile-container">
                    <div className="cardprofile">
                        <h3>Wishlist</h3>
                        <p>{profiledata.wishlist}</p>
                    </div>
                    {/* Repeat the card structure for other application stats */}
                    <div className="cardprofile">
                        <h3>Applied</h3>
                        <p>{profiledata.applied}</p>
                    </div>
                    <div className="cardprofile">
                        <h3>Waiting for Referral</h3>
                        <p>{profiledata.waiting_for_referral}</p>
                    </div>
                    <div className="cardprofile">
                        <h3>Rejected</h3>
                        <p>{profiledata.rejected}</p>
                    </div>
                </div>
            </div>
        </div>
    );


    // return (
    //     <div>
    //         <h2>User Profile</h2>
    //         <div>
    //             <h3>General Information</h3>
    //             <p>Full Name: {profiledata.fullname}</p>
    //             <p>Username: {profiledata.username}</p>
    //             <h3>Application Statistics</h3>
    //             <p>Wishlist: {profiledata.wishlist}</p>
    //             <p>Applied: {profiledata.applied}</p>
    //             <p>Waiting for Referral: {profiledata.waiting_for_referral}</p>
    //             <p>Rejected: {profiledata.rejected}</p>
    //         </div>
    //     </div>
    // );
};

export default UserProfile;

// export default class UserProfile extends Component {
//     render() {
//         return (
//             <div>
//                 <h2>User Profile</h2>
//                 <div>
//                     <h3>General Information</h3>
//                 </div>
//             </div>
//         );
//     }
// }