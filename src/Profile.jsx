import React, { Component } from 'react';
import Promote from './Promote'
import MagicLink from './MagicLink'
import NavbarVhx from './Navbar'
import Compute from './Compute'
import BulkUpload from './BulkUpload'
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
                <Compute/>
                <BulkUpload/>
            </div>
        )
    }
}
