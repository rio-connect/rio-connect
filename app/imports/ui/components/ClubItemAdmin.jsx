import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List CLub (Admin) table. See pages/ListClubsAdmin.jsx. */
const ClubItemAdmin = ({ club }) => (
  <tr>
    <td>{club.name}</td>
    <td>{club.type}</td>
    <td>{club.owner}</td>
    <td>{club.ownerMail}</td>
  </tr>
);

// Require a document to be passed to this component.
ClubItemAdmin.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    owner: PropTypes.string,
    ownerMail: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubItemAdmin;
