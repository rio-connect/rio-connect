import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="justify-content-center py-4">
        <Container>
          <Row className="text-center">
            <Col>
              <Navbar.Brand as={NavLink} to="/" className="text-white">
                <Row className="justify-content-center">
                  <Col xs={1} className="pe-0">
                    <img width="75px" src="images/rio-connect-logo.png" alt="RIO Connect logo." />
                  </Col>
                  <Col xs={3} className="ps-0 py-2">
                    <h1>RIO CONNECT</h1>
                  </Col>
                </Row>
              </Navbar.Brand>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Navbar.Toggle id="toggle-button" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Col>
                <Nav className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link className="pe-5 text-white" href="/">HOME</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="pe-5 text-white" href="/">BROWSE CLUBS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="pe-5 text-white" href="/interests">Interests</Nav.Link>
                  </Nav.Item>
                  {currentUser === '' ? (
                    <NavDropdown id="login-dropdown" title="LOGIN">
                      <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                        <PersonFill />
                        Sign
                        in
                      </NavDropdown.Item>
                      <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                        <PersonPlusFill />
                        Sign
                        up
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown id="navbar-current-user" title={currentUser}>
                      <NavDropdown.Item id="navbar-profile" as={NavLink} to="#">
                        <BoxArrowRight />
                        {' '}
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                        <BoxArrowRight />
                        {' '}
                        Sign
                        out
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </Col>
            </Navbar.Collapse>
          </Row>
        </Container>
      </Container>
    </Navbar>
  );
};

export default NavBar;
