import React, { Component } from 'react';
import Promote from './Promote'
import MagicLink from './MagicLink'
import MasterTable from './MasterTable';
export default class Profile extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Promote />
                <MagicLink/>
                <MasterTable/>
            </div>
        )
    }
}