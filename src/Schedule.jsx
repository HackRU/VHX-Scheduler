import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
import { ClipLoader } from 'react-spinners';
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
export default class Schedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading:false,
            data:[]
        }
    }
    //make request to get volunteer data again
    componentDidMount() {
        const cookie = new Cookies();
        const request_data = {
            "email": cookie.get("email"),
            "token": cookie.get("auth")
        }
        this.setState({
            loading: true
        })
        httpClient.post("/getvolunteers", request_data).then(response => {
            if (response.data.statusCode === 200) {
                this.setState({
                    data: response.data.body,
                    loading: false
                })
            }
            else {
                alert(response.data.body)
            }
        })
    }
    //stuff with the scheduler
    schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day);
    render(){
        if(this.state.loading){
            return (
                <div>
                    <div className='sweet-loading'>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={this.state.loading}
                        />
                    </div>
                </div>
            )
        }
        //display actual schedule now
        else{
            
        }
    }
}