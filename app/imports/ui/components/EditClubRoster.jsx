import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Club';

const EditClubRoster = ({ club }) => {
  // Callback function to remove a member.
  const kickMember = (member) => {
    // Prompt the user for verification.
    swal({
      title: 'Are you sure?',
      text: `Do you want to remove ${member} from ${club.name}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willLeave) => {
        if (willLeave) {
          // A club owner cannot kick themselves.
          if (club.ownerMail === member) {
            swal({
              title: 'Error',
              text: 'You cannot kick the club owner.',
              icon: 'error',
              buttons: {
                cancel: 'Close',
              },
              dangerMode: true,
            });
          } else {
            // Determine the club members without the member.
            const remainingMembers = club.members.filter((m) => m !== member);
            // Update the ClubsCollection without that member.
            Clubs.collection.update(
              club._id,
              { $set: { members: remainingMembers } },
              (error) => (error ?
                swal('Error', error.message, 'error') :
                swal('Success', `${member} kicked successfully`, 'success')),
            );
          }
        }
      });
  };

  // Return something in case the club is undefined. This occurs right after a club is deleted.
  if (!club) {
    return (
      <div>
        <p>Club not found</p>
      </div>
    );
  }

  // Define the appearance of the component.
  return (
    <Card className="text-center" style={{ width: '35rem' }}>
      <Card.Body>
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Email</th>
                <th>Kick</th>
              </tr>
            </thead>
            <tbody>
              {club.members.map(member => (
                <tr>
                  <td>{member}</td>
                  <td><Button onClick={() => kickMember(member)} variant="danger">Kick Member</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Card.Body>
    </Card>
  );
};

EditClubRoster.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    ownerMail: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default EditClubRoster;
