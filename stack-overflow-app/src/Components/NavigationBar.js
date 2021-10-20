import { Link, withRouter } from 'react-router-dom';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import './Login.css';


const NavigationBar = () => {
    return (
        <div className="navigationBar">
            
        <Navbar bg="light" sticky="top" >
        <Container>
          <Navbar.Brand style={{fontFamily:'Teko',fontSize:'30px'}}>Stacked Over</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{fontSize:'15px', fontFamily:'sans-serif'}}>
              <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/question">Questions</Nav.Link>
              <NavDropdown title="Profile">
                <NavDropdown.Item href="http://localhost:3000/">Sign Up/Login</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>

        </div>
    )
}

export default withRouter(NavigationBar)