import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
import { ClipLoader } from 'react-spinners';
import 'react-big-scheduler/lib/css/style.css'
import Scheduler, { SchedulerData, ViewTypes, DATE_FORMAT, CellUnits } from 'react-big-scheduler'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import NavbarVhx from './Navbar'
import {HACKRU_START,HACKRU_END} from './Constants'

import moment from 'moment'
class Schedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
            emails: [],
            shifts: [],
            viewModel: new SchedulerData(new moment().format(),  ViewTypes.Custom, false, false, {
                customCellWidth: 30,
                nonAgendaDayCellHeaderFormat: 'M/D|h:mm A',
                views: [],
            }, {
                getCustomDateFunc: this.getCustomDate
            })

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
                if (this.state.data.length > 0) {
                    //extract the emails as resources and shifts as the times
                    let emails = []
                    let shifts = []
                    for (let i = 0; i < this.state.data.length; i++) {
                        const volunteer = this.state.data[i]
                        emails.push({
                            "id": volunteer.email,
                            "name": volunteer.first_name
                        })
                        //if a shift key exists
                        if ("shifts" in volunteer) {
                            shifts.push.apply(shifts, volunteer.shifts)
                        }
                    }
                    this.setState({
                        "emails": emails,
                        "shifts": shifts
                    })
                    this.setupScheduler()

                }
            }
            else {
                alert(response.data.body)
            }
        }).catch(err => {
            console.error(err)
        })
    }
    //stuff with the scheduler

    setupScheduler() {
        const schedulerData = this.state.viewModel
        schedulerData.setResources(this.state.emails);
        schedulerData.setEvents(this.state.shifts);
        this.setState({
            viewModel: schedulerData
        })
    }
    //TODO: make this do something
    prevClick = (schedulerData) => {
        schedulerData.prev();
        console.log("prev")
    }
    //TODO: make this do something
    nextClick = (schedulerData) => {
        schedulerData.next();
        console.log("next")
    }
    //TODO: make this do something
    onViewChange = (schedulerData, view) => {
        console.log("view changed")
    }
    //TODO: make this do something
    onSelectDate = (schedulerData, date) => {
        console.log("date selected")
    }
    getCustomDate = (schedulerData, num, date = undefined) => {
        const {viewType} = schedulerData;
        let selectDate = schedulerData.startDate;
    
        if(date != undefined)
            selectDate = date;
       //START DATE AND END DATE SET HERE
       let startDate = schedulerData.localeMoment(HACKRU_START).format("YYYY-MM-DDTHH:mm")
        let dateToday =  moment();
        let startMoment = moment(HACKRU_START)
        let endMoment = moment(HACKRU_END)
          if(dateToday.isBetween(startMoment,endMoment)){
              startDate = schedulerData.localeMoment().format("YYYY-MM-DDTHH:mm")
          }
          

           let  endDate = schedulerData.localeMoment(HACKRU_END).format("YYYY-MM-DDTHH:mm")
           let  cellUnit = CellUnits.Hour;
 
        return {
            startDate,
            endDate,
            cellUnit
        };
    }
    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if (item.id >= newFreshId)
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
            "user_email": slotId,
            "event": newEvent
        }
        httpClient.post("/saveshifts", request_data).then(resp => {

        }).catch(err => {
            console.error(err)
        })
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData
        })

    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <NavbarVhx />
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
        else {
            return (
                <div>
                    <NavbarVhx />
                    <Scheduler schedulerData={this.state.viewModel}
                        newEvent={this.newEvent}
                        nextClick={this.nextClick}
                        prevClick={this.prevClick}
                        onViewChange={this.onViewChange}
                        onSelectDate={this.onSelectDate}
                    />
                </div>

            )
        }
    }
}
export default DragDropContext(HTML5Backend)(Schedule)