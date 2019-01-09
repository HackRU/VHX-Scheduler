import React, { Component } from 'react';

export default class Promote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            role:""
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

                    <label>
                        volunteer
                        <input type="radio" id='volunteer'
                            value={this.state.role} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}