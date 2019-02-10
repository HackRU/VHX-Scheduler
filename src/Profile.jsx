import React, { Component } from 'react';
import Promote from './Promote'
import MagicLink from './MagicLink'
import NavbarVhx from './Navbar'
export default class Profile extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <NavbarVhx/>
                <Promote/>
                <MagicLink/>
            </div>
        )
    }
}
