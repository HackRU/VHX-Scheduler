import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
export default class MagicLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailToList: "",
            isVolunteer: false,
            isDirector: false,
            isOrganizer: false,
            isJudge: false
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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    toggleChangeVolunteer = () => {
        this.setState(prevState => ({
          isVolunteer: !prevState.isVolunteer,
        }));
      }

      toggleChangeDirector = () => {
        this.setState(prevState => ({
          isDirector: !prevState.isDirector,
        }));
      } 

      toggleChangeJudge = () => {
        this.setState(prevState => ({
          isJudge: !prevState.isJudge,
        }));
      } 

      toggleChangeOrganizer = () => {
        this.setState(prevState => ({
          isOrganizer: !prevState.isOrganizer,
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