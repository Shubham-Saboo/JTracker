import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { getToken, signUp, storeToken } from '../api/loginHandler';

export default class LoginPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            skills: [''], // Array to hold skills
            education: [''], // Array to hold education
            workExperience: [''], // Array to hold work experience
        }
    }

    handleAddField = (fieldName) => {
        this.setState((prevState) => ({
            [fieldName]: [...prevState[fieldName], ''],
        }));
    };

    handleRemoveField = (index, fieldName) => {
        this.setState((prevState) => {
            const updatedField = [...prevState[fieldName]];
            updatedField.splice(index, 1);
            return { [fieldName]: updatedField };
        });
    };    

    handleChange = (index, fieldName, event) => {
        const { value } = event.target;
        this.setState((prevState) => {
            const updatedField = [...prevState[fieldName]];
            updatedField[index] = value;
            return { [fieldName]: updatedField };
        });
    };

    handleLogin = (uname, pwd) =>{
        console.log("Login click");
        let obj = {
            username: uname,
            password: pwd
        }
        //console.log(obj)
        getToken(obj).then((res) => {
            console.log(res)
            if(res['error'])
                throw new Error("Wrong username or password");
            storeToken(res)
            this.props.side()
        }).catch((error) => {
            console.log(error)
            alert("Error while login ! Wrong username or password");
        })
         
    }

    handleSignup = (fullname, uname, pwd, email, skills, education, workExperience) => {
        console.log("Signup click");
        console.log(skills);
        let obj = {
            username: uname,
            email: email,
            password: pwd,
            fullName: fullname,
            skills: skills,
            education: education,
            workExperience: workExperience
        }
        console.log(obj)
        signUp(obj).then((res) => {
            alert("Sign up successfull! Proceed to Login");
        }).catch((error) => {
            alert("Error while signing up !");
        })
         
    }

    render() {
        const { skills, education, workExperience } = this.state;
        return(
            <div className="auth-wrapper" style={this.authWrapper}>
                <div className="auth-inner" style={this.authInner}>
                {/* <div className="logindiv" style={this.divStyle}> */}
                <Tabs defaultActiveKey="login" id="logintab" className="mx-auto" style={{paddingLeft: '25%'}}>
                    <Tab eventKey="login" title="Login">
                        <form>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" id="uname" placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="pwd" placeholder="Enter password" />
                            </div>

                            <button type="submit" onClick={(e) =>{
                                e.preventDefault();
                                let uname = document.querySelector("#uname").value
                                let pwd = document.querySelector("#pwd").value
                                this.handleLogin(uname, pwd)
                                }} 
                            className="btn btn-secondary btn-block">Login</button>
                        </form>
                    </Tab>
                    <Tab eventKey="signup" title="Signup">
                        <form>
                            <div className="form-group">
                                <label>Full name</label>
                                <input type="text" className="form-control" id="fullname" placeholder="Full name" />
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" id="suname" placeholder="Enter username" />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" id="email" placeholder="Enter Email Id" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="spwd" placeholder="Enter password" />
                            </div>

                            <div className="form-group">
                                <label>Skills</label>
                                {skills.map((skill, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            className="skillsInput"
                                            placeholder="Enter skill"
                                            value={skill}
                                            onChange={(e) => this.handleChange(index, 'skills', e)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => this.handleRemoveField(index, 'skills')}
                                            className="btn btn-sm btn-danger ml-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => this.handleAddField('skills')}
                                    className="btn btn-sm btn-secondary mt-2"
                                >
                                    Add Skill
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Education Details</label>
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            className="educationInput"
                                            placeholder="Enter education detail"
                                            value={edu}
                                            onChange={(e) => this.handleChange(index, 'education', e)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => this.handleRemoveField(index, 'education')}
                                            className="btn btn-sm btn-danger ml-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => this.handleAddField('education')}
                                    className="btn btn-sm btn-secondary mt-2"
                                >
                                    Add Education
                                </button>
                            </div>

                            <div className="form-group">
                                <label>Work Experience</label>
                                {workExperience.map((exp, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            className="workExperienceInput"
                                            placeholder="Enter work experience detail"
                                            value={exp}
                                            onChange={(e) => this.handleChange(index, 'workExperience', e)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => this.handleRemoveField(index, 'workExperience')}
                                            className="btn btn-sm btn-danger ml-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => this.handleAddField('workExperience')}
                                    className="btn btn-sm btn-secondary mt-2"
                                >
                                    Add Work Experience
                                </button>
                            </div>


                            <button type="submit" onClick={(e) =>{
                                e.preventDefault();
                                let name = document.querySelector("#fullname").value
                                let uname = document.querySelector("#suname").value
                                let pwd = document.querySelector("#spwd").value
                                let email = document.querySelector("#email").value

                                // Fetch skills
                                const skills = Array.from(document.querySelectorAll(".skillsInput")).map(input => input.value);
                                console.log(skills)
                                // Fetch education details
                                const education = Array.from(document.querySelectorAll(".educationInput")).map(input => input.value);

                                // Fetch work experience details
                                const workExperience = Array.from(document.querySelectorAll(".workExperienceInput")).map(input => input.value);

                                this.handleSignup(name, uname, pwd, email, skills, education, workExperience);
                                //this.handleSignup(name, uname, pwd)
                                }}  className="btn btn-secondary btn-block">Sign Up</button>
                        </form>
                    </Tab>
                </Tabs> 
                </div>
            </div>
                           
        )
    }

    divStyle = {
        width: '50vw',
      };    
    
    authWrapper = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'left',
        marginTop: '5vh',
    };
      
    authInner = {
        width: '450px',
        margin: 'auto',
        background: '#ffffff',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        padding: '40px 55px 45px 55px',
        borderRadius: '15px',
        transition: 'all .3s'
    };
}
