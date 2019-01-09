import React, { Component } from 'react';

export default class Promote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ""
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter the email you want to promote:
                        <input type="text" id='email'
                            value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}