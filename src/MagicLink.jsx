import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
export default class MagicLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailToList: "",
            permissions: ""
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = event =>{
        event.preventDefault();
    }
    render(){
        return(
            <div>
                 <form onSubmit={this.handleSubmit}>
                 <label>
                        Enter the emails(s) you want to send magic links to (Comma Seperated if multiple)
                        <input type="text" id='emailToList'
                            value={this.state.emailToList} onChange={this.handleChange} />
                    </label>
                 </form>
            </div>
        )
    }

}