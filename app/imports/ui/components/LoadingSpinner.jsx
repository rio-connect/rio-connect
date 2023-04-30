import React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container id="loadingSpinner">
    <Row className="justify-content-md-center pt-5">
      <Spinner animation="border" />
      Getting data
    </Row>
  </Container>
);

export default LoadingSpinner;
