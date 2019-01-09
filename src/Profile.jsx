import React, { Component } from 'react';
import Promote from './Promote'
export default class Profile extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Promote />
            </div>
        )
    }
}