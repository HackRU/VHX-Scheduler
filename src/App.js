import React, { Component } from 'react';
import Login from './Login'
import Profile from './Profile'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div className="App">
        Welcome To VHX Scheduler
        <Router>
            <div>
                <Route exact path="/" component={Login}/>
                <Route path="/profile" component={Profile}/>
            </div>
      </Router>
      </div>
    );
  }
}

export default App;
