import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Profile (Admin) table. See pages/ListProfilesAdmin.jsx. */
const ProfileItemAdmin = ({ profile }) => (
  <tr>
    <td>{profile.email}</td>
    <td>{profile.name}</td>
    <td>{profile.phoneNo}</td>
  </tr>
);

// Require a document to be passed to this component.
ProfileItemAdmin.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    phoneNo: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfileItemAdmin;
