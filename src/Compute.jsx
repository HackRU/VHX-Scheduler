import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import {httpClient} from './handlers/axiosConfig'
export default class Compute extends Component {

    computeTravel(){
        httpClient.post("/compute").then(response =>{
            alert(response.data.body)
        })
    }

    render(){
        <Button variant="secondary"  onClick={this.computeTravel}>Compute Travel Reimbursements</Button>
    }
}