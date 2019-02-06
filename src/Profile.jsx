import React, { Component } from 'react';
import Promote from './Promote'
import MagicLink from './MagicLink'
import MasterTable from './MasterTable';
import Schedule from './Schedule'
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
