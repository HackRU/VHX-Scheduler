import React, { Component } from 'react';


export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            login:"",
            password:""
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