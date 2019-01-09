import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie';

export default class Promote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            role:""
        }
    }
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

    handleSubmit = event => {
        event.preventDefault();
        const cookies = new Cookies();
        const request_data= {
            "auth_email":cookies.get("email"),
            "auth":cookies.get("auth"),
            "user_email":this.state.email,
            "role":this.state.role,
            "roleValue":true
        }
        httpClient.post("/promote",request_data).then(response =>{
            if(response.data.statusCode === 200){
                alert(response.data.body)
            }
            else{
                alert(response.data.body)
            }
        }).catch(error =>{
            console.error(error);
        })
    }  

    render() {
        return (
            <div>
                Promote an existing user to a status
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter the email you want to promote:
                        <input type="text" id='email'
                            value={this.state.email} onChange={this.handleChange} />
                    </label>

                    <label>
                        Volunteer
                        <input type="radio" id='role'
                            value="volunteer" onChange={this.handleChange} />
                    </label>

                    <label>
                        Director
                        <input type="radio" id='director'
                            value="director" onChange={this.handleChange} />
                    </label>

                    <label>
                        Judge
                        <input type="radio" id='role'
                            value="judge" onChange={this.handleChange} />
                    </label>

                    <label>
                        Organizer
                        <input type="radio" id='role'
                            value="organizer" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}