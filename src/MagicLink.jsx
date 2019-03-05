import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
import ReactFileReader from 'react-file-reader'
export default class MagicLinks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailToList: "",
            volunteer: false,
            director: false,
            organizer: false,
            judge: false,
            mentor: false,
            sponsor: false
        }
    }

    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = e => {
            //conver csv to json
            const csv = reader.result;
            const lines = csv.split("\n");
            let result = [];
            const headers = lines[0].split(",");
            for (let i = 1; i < lines.length; i++) {
                let obj = {};
                let currentline = lines[i].split(",");
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            // now send magic links and add to Dynamo
            //make request to magic link
            let emailList = ""
            //build a json array 
            let volunteers = {}
            for (let i in result) {
                if (result[i]['Name'] != undefined && result[i]['Name'] != "") {

                    let volunteer_entry = {}
                    if (result[i]['Name'] in volunteers) {
                        //if name already exists add
                        volunteer_entry = volunteers[result[i]['Name']]
                    }
                    else {
                         volunteer_entry = {
                            "name": result[i]["Name"],
                            "email": "",
                            "shifts": []
                        }
                    }
                    //add the shifts

                    const time = result[i]['Time'].split("||");
                    if (time.length < 2) {
                        continue
                    }
                    const start = time[0]
                    const end = time[1]
                    if ('Email' in result[i]) {
                        if (result[i]["Email"] !== undefined && result[i]['Email'] !== "") {
                            if (volunteer_entry['email'] == "") {
                                volunteer_entry["email"] = result[i]['Email']
                            }
                            emailList += result[i]['Email'] + ","
                        }
                        //parse through csv and add volunteers to dynamo
                        volunteer_entry['shifts'].push({
                                "bgColor": "Blue",
                                "end": end,
                                "id": Math.floor(Math.random() * 1000),
                                "resourceId": volunteer_entry['email'],
                                "start": start,
                                "title": "On Shift"
                                
                            }
                        

                        );
                        volunteers[volunteer_entry['name']] = volunteer_entry
                    }
                }
            }
            this.setState({
                "emailToList": emailList.substring(0, emailList.length - 1)
            });
            //make post requests
            for(let key in volunteers){
                if (volunteers.hasOwnProperty(key)) {
                    for(let i in volunteers[key]['shifts']){
                        const request_data = {
                            "user_email": volunteers[key]['email'],
                            "event": volunteers[key]['shifts'][i]
                        }
                        httpClient.post("/saveshifts", request_data).then(resp => {
                         }).catch(err => {
                            console.error(err)
                        })

                }
            }
              
        }

        }
        reader.readAsText(files[0]);
    }


    handleSubmit = event => {
        event.preventDefault();
        //build permissions
        let permissionsList = "";
        for (var key in this.state) {
            if (key !== "emailToList") {
                if (this.state[key] === true) {
                    permissionsList += key
                    permissionsList += ","
                }
            }
        }
        const cookie = new Cookies()
        const authEmail = cookie.get("email")
        const token = cookie.get("auth")
        let request_data = {
            "email": authEmail,
            "token": token,
            "emailsToSend": this.state.emailToList,
            "permissions": permissionsList
        }
        if (permissionsList.substring(0, permissionsList.length - 1) == "sponsor") {
            request_data['template'] = 'sponsor-invite'
            request_data['link_base'] = 'sponsorship.hackru.org/magic'
        }

        httpClient.post('/magiclink', request_data).then(response => {
            if (response.data.statusCode !== 200) {
                alert(response.data.body)
            }
            else {
                alert("Sucessful request")
            }
        }).catch(error => {
            console.error(error)
        })

    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    toggleChangeVolunteer = () => {
        this.setState(prevState => ({
            volunteer: !prevState.volunteer,
        }));
    }

    toggleChangeDirector = () => {
        this.setState(prevState => ({
            director: !prevState.director,
        }));
    }

    toggleChangeJudge = () => {
        this.setState(prevState => ({
            judge: !prevState.judge,
        }));
    }

    toggleChangeMentor = () => {
        this.setState(prevState => ({
            mentor: !prevState.mentor,
        }));
    }

    toggleChangeOrganizer = () => {
        this.setState(prevState => ({
            organizer: !prevState.organizer,
        }));
    }
    toggleChangeSponsor = () => {
        this.setState(prevState => ({
            sponsor: !prevState.sponsor,
        }));
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter the emails(s) you want to send magic links to (Comma Seperated if multiple)
                        <input type="text" id='emailToList'
                            value={this.state.emailToList} onChange={this.handleChange} />
                    </label>

                    <label>
                        <input type="checkbox"
                            checked={this.state.volunteer}
                            onChange={this.toggleChangeVolunteer}

                        />
                        Volunteer
                    </label>

                    <label>
                        <input type="checkbox"
                            checked={this.state.director}
                            onChange={this.toggleChangeDirector}

                        />
                        Director
                    </label>

                    <label>
                        <input type="checkbox"
                            checked={this.state.organizer}
                            onChange={this.toggleChangeOrganizer}

                        />
                        Organizer
                    </label>

                    <label>
                        <input type="checkbox"
                            checked={this.state.judge}
                            onChange={this.toggleChangeJudge}

                        />
                        Judge
                    </label>

                    <label>
                        <input type="checkbox"
                            checked={this.state.mentor}
                            onChange={this.toggleChangeMentor}

                        />
                        Mentor
                    </label>

                    <label>
                        <input type="checkbox"
                            checked={this.state.sponsor}
                            onChange={this.toggleChangeSponsor}
                        />
                        Sponsor
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className='btn'>Bulk Send Magic Links</button>
                </ReactFileReader>

            </div>
        )
    }
}

