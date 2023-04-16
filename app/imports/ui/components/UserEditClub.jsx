import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Container, Button, Form } from 'react-bootstrap';

const UserEditClub = ({ clubs }) => {
  const [selectedClubId, setSelectedClubId] = useState(clubs[0]?._id);

  const handleClubChange = (event) => {
    setSelectedClubId(event.target.value);
  };

  return (
    <Container className="py-3 gray-background">
      <Container>
        <Row className="justify-content-center ps-2 pe-2">
          <Row className="pb-2">
            Choose club:
          </Row>
          <Row>
            <Form.Select onChange={handleClubChange}>
              {clubs.map((club) => (
                <option key={club._id} value={club._id}>
                  {club.name}
                </option>
              ))}
            </Form.Select>
          </Row>
        </Row>
        <Row className="justify-content-center pt-3">
          <a
            href={`editclub?clubId=${selectedClubId}`}
            className="text-center gap-2 text-decoration-none text-white"
          >
            <Button variant="primary" size="lg">
              Edit Club
            </Button>
          </a>
        </Row>
      </Container>
    </Container>
  );
};

UserEditClub.propTypes = {
  clubs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
  ).isRequired,
};

export default UserEditClub;
