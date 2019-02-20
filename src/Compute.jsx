import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import {httpClient} from './handlers/axiosConfig'
import Cookies from 'universal-cookie';
export default class Compute extends Component {

    computeTravel(){

        const cookies = new Cookies();
        const body = {
            "email":cookies.get("email"),
            "token":cookies.get("auth")
        }
        httpClient.post("/compute",body).then(response =>{
            alert(response.data.body)
        })
    }

    render(){
        return (<Button variant="secondary"  onClick={this.computeTravel}>Compute Travel Reimbursements</Button>)
    }
}