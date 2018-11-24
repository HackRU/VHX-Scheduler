import React, { Component } from 'react';


export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            login:"",
            password:""
        }
}
 handleSubmit(){
    console.log("fuck")
 }
  render() {
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" />
        </label>
    

          <label>
          password:
          <input type="password"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}