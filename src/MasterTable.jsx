import React, { Component } from 'react';
import { httpClient } from "./handlers/axiosConfig"
import Cookies from 'universal-cookie'
import ReactDataGrid from "react-data-grid";
import { css } from '@emotion/core';
// First way to import
import { ClipLoader } from 'react-spinners';
/**
 * Master table of all volunteers
 */
const columns = [
    { key: "email", name: "Email"},
    { key:"first_name", name:"First Name" },
    { key:"last_name",name:"Last Name"},
    { key:"shift", name:"Shift", editable:true},
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
    //fetch data
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
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
          const rows = state.data.slice();
          for (let i = fromRow; i <= toRow; i++) {
            this.state.data[i] = { ...rows[i], ...updated };
          }
          return { rows };
        });
      };
  

    render() {
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
