import React, { Component } from 'react';
import {httpClient} from "./handlers/axiosConfig"



export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            login:"",
            password:"",
        }
   
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange = event => {
    console.log(event.target)
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const request_data = {
      "email":this.state.login,
      "password":this.state.password
  }
  httpClient.post("/login",request_data).then(response =>{
    if(response.data.statusCode === 200){
      this.props.history.push({ //browserHistory.push should also work here
        pathname: '/profile',
        state:{data:response.data}
      }); 
    }
    else{
      alert(response.data.body)
    }
  }).catch(err =>{
    console.error("An error occured while making the request")
  });
}

  
  
  render() {
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" id='login' value={this.state.login} onChange={this.handleChange}/>
        </label>
          <label>
          Password:
          <input type="password" id='password'  value={this.state.password} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}