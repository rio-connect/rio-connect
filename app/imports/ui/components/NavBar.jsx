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
                <h2>RIO Connect</h2>
              </Navbar.Brand>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Col>
                <Nav className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link className="pe-5 text-white">Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="pe-5 text-white">Browse Clubs</Nav.Link>
                  </Nav.Item>
                  {currentUser === '' ? (
                    <NavDropdown id="login-dropdown" title="Login">
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
