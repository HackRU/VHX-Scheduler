import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
export default class MagicLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailToList: "",
            volunteer: false,
            director: false,
            organizer: false,
            judge: false
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        //build permissions
        let permissionsList = "";
        for (var key in this.state) {
          if(key !=="emailToList" ){
            if(this.state[key] === true) {
                permissionsList += key
                permissionsList +=","
          }
        }
    }
        const cookie = new Cookies()
        const authEmail = cookie.get("email")
        const token = cookie.get("auth")
        const request_data = {
            "email":authEmail,
            "token":token,
            "emailsToSend":this.state.emailToList,
            "permissions":permissionsList
        }

        httpClient.post('/magiclink',request_data).then(response =>{
            if(response.data.statusCode !== 200){
                alert(response.data.body)
            }
            else{
                alert("Sucessful request")
            }
        }).catch(error =>{
            console.error(error)
        })
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    toggleChangeVolunteer = () => {
        this.setState(prevState => ({
          volunteer: !prevState.volunteer,
        }));
      }

      toggleChangeDirector = () => {
        this.setState(prevState => ({
          director: !prevState.director,
        }));
      } 

      toggleChangeJudge = () => {
        this.setState(prevState => ({
          judge: !prevState.judge,
        }));
      } 

      toggleChangeOrganizer = () => {
        this.setState(prevState => ({
          organizer: !prevState.organizer,
        }));
      } 
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter the emails(s) you want to send magic links to (Comma Seperated if multiple)
                        <input type="text" id='emailToList'
                            value={this.state.emailToList} onChange={this.handleChange} />
                    </label>

                    <label className="form-check-label">
                        <input type="checkbox"
                            checked={this.state.isVolunteer}
                            onChange={this.toggleChangeVolunteer}
                            className="form-check-input"
                        />
                        Volunteer
                    </label>

                    <label className="form-check-label">
                        <input type="checkbox"
                            checked={this.state.isDirector}
                            onChange={this.toggleChangeDirector}
                            className="form-check-input"
                        />
                        Director
                    </label>

                    <label className="form-check-label">
                        <input type="checkbox"
                            checked={this.state.isOrganizer}
                            onChange={this.toggleChangeOrganizer}
                            className="form-check-input"
                        />
                        Organizer
                    </label>

                    <label className="form-check-label">
                        <input type="checkbox"
                            checked={this.state.isJudge}
                            onChange={this.toggleChangeJudge}
                            className="form-check-input"
                        />
                        Judge
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

}