import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardHeader from 'react-bootstrap/CardHeader';
import PropTypes from 'prop-types';

/** Renders a single club card. */
const ClubCard = ({ club, onLeaveClub, onJoinClub, currentUser }) => {

  const isAdmin = Meteor.userId() && (Roles.userIsInRole(Meteor.userId(), 'admin'));
  const canEdit = currentUser && (isAdmin || currentUser === club.ownerMail);
  const [isMember, setIsMember] = useState(club.members.includes(currentUser));

  useEffect(() => {
    setIsMember(club.members.includes(currentUser));
  }, [club.members, currentUser]);

  return (
    <Container className="py-3">
      <Card id="browse-club-card">
        <CardHeader className="d-flex justify-content-center" id="browse-club-card-name"><h1>{club.name}</h1></CardHeader>
        <Row>
          <Col>
            <Image src={club.image} className="img-thumbnail m-4 p-4" />
          </Col>
          <Col className="d-flex flex-column">
            <Row className="px-4 pt-4">
              <h2> Club Type</h2>
              <p>{club.type}</p>
            </Row>
            <Row className="px-4">
              <h2> Contact Person</h2>
              <p>{club.owner}</p>
            </Row>
            <Row className="px-4">
              <h2> Contact email</h2>
              <a href={`mailto:${club.ownerMail}`}>{club.ownerMail}</a>
            </Row>
          </Col>
        </Row>
        <Row className="px-4">
          <h2>Club Purpose</h2>
          <p>{club.description}</p>
        </Row>
        {(currentUser) ? (
          <Card.Footer>
            <Row>
              {(isAdmin) ? ''
                : (
                  <Col>
                    {(isMember) ? (
                      <Button className="btn-danger" onClick={() => onLeaveClub(club)} id="leave-club-btn">Leave Club</Button>
                    ) : <Button className="btn-success" onClick={() => onJoinClub(club)} id="join-club-btn">Join Club</Button>}
                  </Col>
                )}
              <Col className="d-flex justify-content-end">
                {(canEdit) ? (
                  <Link to={`/${club._id}`}>
                    <Button id="edit-club-link">Edit Club</Button>
                  </Link>
                ) : ''}
              </Col>
            </Row>
          </Card.Footer>
        ) :
          ''}
      </Card>
    </Container>
  );
};

ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    ownerMail: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  onLeaveClub: PropTypes.func.isRequired,
  onJoinClub: PropTypes.func.isRequired,
  currentUser: PropTypes.string,
};

ClubCard.defaultProps = {
  currentUser: null,
};

export default ClubCard;
