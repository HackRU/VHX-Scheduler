import React, { Component } from 'react';
import Login from './Login'
import Profile from './Profile'
import MasterTable from './MasterTable'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Schedule from './Schedule';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <div className="container-fluid">
                <Route exact path="/" component={Login}/>
                <Route path="/profile" component={Profile}/>
                <Route path ="/MasterTable" component={MasterTable}/>
                <Route path = "/Schedule" component={Schedule}/> 
            </div>
      </Router>

      </div>
    );
  }
}

export default App;
