import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
export default class NavbarVhx extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Promotions</Nav.Link>
                        <Nav.Link href="/MasterTable">MasterTable</Nav.Link>
                        <Nav.Link href="/Schedule">Schedule</Nav.Link>
                    </Nav>
            </Navbar>
        )
    }
}