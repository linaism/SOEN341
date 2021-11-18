import {Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import React from 'react'
import './Login.css';
import 'bootstrap/dist/css/bootstrap.css';

const NavigationBar = () => {

    const logout = () => {
      Axios.get("http://localhost:5001/logout").then((response) => {
          response.data.loggedIn = false;
      });
    };

    return (
        <div className="navigationBar">
            
        <Navbar bg="light" sticky="top" >
        <Container>
          <Navbar.Brand style={{fontFamily:'Teko',fontSize:'30px'}}>Stacked Over</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{fontSize:'15px', fontFamily:'sans-serif'}}>
              <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
              <Nav.Link href="http://localhost:3000/questions">Questions</Nav.Link>
              <NavDropdown title="Profile">
                <NavDropdown.Item href="http://localhost:3000/">Sign Up/Login</NavDropdown.Item>
                <NavDropdown.Item href="http://localhost:3000/" onClick={logout}>Log out</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="http://localhost:3000/ask-question">
                <button>
                  Ask Question
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>

        </div>
    )
}

export default withRouter(NavigationBar)