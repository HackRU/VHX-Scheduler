import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
import ReactDataGrid from "react-data-grid";
import { ClipLoader } from 'react-spinners';
/**
 * Master table of all volunteers
 */
const columns = [
    { key: "email", name: "Email"},
    { key:"first_name", name:"First Name" },
    { key:"current_action", name:"Current Action", editable:true}
];
export default class MasterTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: false
        }
    }
    //fetch data on mounting
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
    //handler for changing the stafe on updating a row
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
          const rows = state.data.slice();
          for (let i = fromRow; i <= toRow; i++) {
            
            this.state.data[i] = { ...rows[i], ...updated };
            //make request to save the data
    
            const request_data = {
                "user_email":rows[i]["email"],
                "current_action":updated['current_action']
            }
                httpClient.post("/saveaction",request_data)
          }
          return { rows };
        });
      };
  
    //condtional render becase react-data-grid doesnt have loading prop
    render() {
        //load a loading screen while fetching the data from the api
        if (this.state.loading) {
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
        else {
            return (
                <div>
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={i => 
                            this.state.data[i]}
                        rowsCount={this.state.data.length}
                        onGridRowsUpdated={this.onGridRowsUpdated}
                        enableCellSelect={true}
                    />
                </div>
            )
        }
    }
}
