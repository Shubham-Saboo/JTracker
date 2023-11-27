// import React, { useState, useEffect, Component } from 'react';
// import axios from 'axios';

// const UserProfile = () => {
//     // const [userData, setUserData] = useState({});
//     const [profiledata, setprofiledata] = useState({});

//     useEffect(() => {
//         // Fetch application statistics
//         axios.get('http://localhost:5000/users/profile')
//             .then(response => {
//                 setprofiledata(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching application statistics:', error);
//             });
//     }, []);

//     return (
//         <div>
//             <h2>User Profile</h2>
//             <div>
//                 <h3>General Information</h3>
//                 <p>Full Name: {profiledata.fullname}</p>
//                 <p>Username: {profiledata.username}</p>
//                 <h3>Application Statistics</h3>
//                 <p>Wishlist: {profiledata.wishlist}</p>
//                 <p>Applied: {profiledata.applied}</p>
//                 <p>Waiting for Referral: {profiledata.waiting_for_referral}</p>
//                 <p>Rejected: {profiledata.rejected}</p>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;

import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiledata: {}
        };
    }

    componentDidMount() {
        // Fetch user profile data
        axios.get('http://localhost:5000/users/profile')
            .then(response => {
                this.setState({ profiledata: response.data });
                console.log('Hi')
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }

    render() {
        const { profiledata } = this.state;

        return (
            <div>
                <h2>User Profile</h2>
                <div>
                    <h3>General Information</h3>
                    <p>Full Name: {profiledata.fullname}</p>
                    <p>Username: {profiledata.username}</p>
                    <h3>Application Statistics</h3>
                    <p>Wishlist: {profiledata.wishlist}</p>
                    <p>Applied: {profiledata.applied}</p>
                    <p>Waiting for Referral: {profiledata.waiting_for_referral}</p>
                    <p>Rejected: {profiledata.rejected}</p>
                </div>
            </div>
        );
    }
}

export default UserProfile;
