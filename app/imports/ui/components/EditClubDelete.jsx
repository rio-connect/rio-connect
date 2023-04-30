import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Button, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Club';

const EditClubDelete = ({ club }) => {
  const [redirect, setRedirect] = useState(false);
  // Callback function to remove a member.
  const deleteClub = () => {
    // Prompt the user for verification.
    swal({
      title: 'Are you sure?',
      text: `Deleting ${club.name} cannot be undone.`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(() => {
        // remove this club from ClubsCollection
        const name = club.name;
        Clubs.collection.remove(
          { _id: club._id },
          swal('Success', `${name} deleted successfully`, 'success'),
        );
      }).then(() => {
        setRedirect(true);
      });
  };

  // Define the appearance of the component.
  if (redirect) {
    return (<Navigate to="/browseclubs" />);
  }
  return (
    <Card className="text-center" style={{ width: '35rem' }}>
      <Card.Body>
        <Row>
          <Button onClick={() => deleteClub()} variant="danger" size="lg">Delete</Button>
        </Row>
      </Card.Body>
    </Card>
  );
};

EditClubDelete.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    ownerMail: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default EditClubDelete;
