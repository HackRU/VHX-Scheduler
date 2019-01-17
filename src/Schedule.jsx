import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
import { ClipLoader } from 'react-spinners';
import 'react-big-scheduler/lib/css/style.css'
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import moment from 'moment'
class Schedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            data:[],
            emails:[],
            shifts:[],
            viewModel:new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Day)
      
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
                if(this.state.data.length > 0){
                    //extract the emails as resources and shifts as the times
                    let emails = []
                    let shifts = []
                    for(let i=0;i<this.state.data.length;i++){
                       const volunteer = this.state.data[i]
                        emails.push({
                            "id":volunteer.email,
                            "name":volunteer.first_name
                        })
                        //if a shift key exists
                        if("shifts" in volunteer){
                            shifts.push.apply(shifts,volunteer.shifts)
                        }
                    }
                    this.setState({
                        "emails":emails,
                        "shifts":shifts
                    })
                    this.setupScheduler()
              
                }
            }
            else {
                alert(response.data.body)
            }
        }).catch(err =>{
            console.error(err)
        })
    }
    //stuff with the scheduler
 
    setupScheduler(){
        console.log("setup called")
        const schedulerData = this.state.viewModel
        schedulerData.setResources(this.state.emails);
        schedulerData.setEvents(this.state.shifts);
        this.setState({
            viewModel:schedulerData
        })
    }
    prevClick = (schedulerData)=> {
        schedulerData.prev();
       console.log("prev")
    }

    nextClick = (schedulerData)=> {
        console.log("next")
    }
    onViewChange = (schedulerData, view) => {
        console.log("view changed")
    }

    onSelectDate = (schedulerData, date) => {
        console.log("date selected")
    }

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });
            
            let newEvent = {
                id: newFreshId,
                title: 'On Shift',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'Blue'
            }
            //make request to endpoint to save the data
            const request_data = {
                 "user_email":slotId,
                 "event":newEvent
            }
            console.log(slotId)
            httpClient.post("/saveshifts",request_data).then(resp=>{
                
            }).catch(err=>{
                console.error(err)
            })
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        
    }

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
            return(
                <Scheduler schedulerData={this.state.viewModel}
                            newEvent={this.newEvent}
                            nextClick={this.nextClick}
                            prevClick={this.prevClick}
                            onViewChange={this.onViewChange}
                            onSelectDate={this.onSelectDate}
     />
            )
        }
    }
}
export default DragDropContext(HTML5Backend)(Schedule)