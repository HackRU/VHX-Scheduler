import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader'

export default class BulkUpload extends Component {
    constructor() {
        super()
    }
    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = e => {
            // Use reader.result
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
        }
        reader.readAsText(files[0]);
    }

    render() {
        return (
            <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                <button className='btn'>Upload</button>
            </ReactFileReader>
        )
    }
}

