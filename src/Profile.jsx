import React, { Component } from 'react';
import Promote from './Promote'
import MagicLink from './MagicLink'
export default class Profile extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Promote />
                <MagicLink/>
            </div>
        )
    }
}