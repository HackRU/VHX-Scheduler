import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie';
import { Container, Row, Col} from "reactstrap";


export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      login: "",
      password: "",
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const request_data = {
      "email": this.state.login,
      "password": this.state.password
    }
    httpClient.post("/login", request_data).then(response => {
      if (response.data.statusCode === 200) {
        //extract the body of the request
        const parsedData = JSON.parse(response.data.body)
        const cookies = new Cookies();
        //set cookies to now allow using the auth token from now on
        cookies.set('auth', parsedData.token, { path: '/' });
        cookies.set('email', request_data.email, { path: '/' });
        this.props.history.push({
          pathname: '/profile',
          state: { data: parsedData }
        });
      }
      else {
        alert(response.data.body)
      }
    }).catch(err => {
      console.error("An error occured while making the request")
    });
  }



  render() {
    return (
      <Container fluid style={{ width: "100%", minHeight: "100vh", textAlign: "center"}} >
        <Row className="d-flex align-items-center">
          <Col>
            <div className="LoginForm">
              <div className="display-1">VHX Scheduler Login</div>
              <form onSubmit={this.handleSubmit}>

                <label>
                  Username:
                <input type="text" id='login' value={this.state.login} onChange={this.handleChange} />
                </label>

                <label>
                  Password:
                <input type="password" id='password' value={this.state.password} onChange={this.handleChange} />
                </label>
                {"&emsp"}
                <input type="submit" value="Submit" />
              </form>

            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
