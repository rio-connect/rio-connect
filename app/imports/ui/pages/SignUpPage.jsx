import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Profiles } from '../../api/profile/Profile';

/**
 * SignUpPage component is similar to signin component, but we create a new user instead.
 */
const SignUpPage = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    name: String,
    phoneNo: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUpPage submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, name, phoneNo } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        Profiles.collection.insert({ email: email, name: name, phoneNo: phoneNo });
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/browseclubs' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <TextField name="name" placeholder="Name" />
                <TextField name="phoneNo" placeholder="Phone Number" />
                <ErrorsField />
                <SubmitField id="signup-form-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link className="text-white" to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUpPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUpPage.defaultProps = {
  location: { state: '' },
};

export default SignUpPage;
