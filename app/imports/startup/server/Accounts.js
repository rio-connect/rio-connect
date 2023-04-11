import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';

/* eslint-disable no-console */

function createUser(email, password, role, name, phoneNo) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    AdminProfiles.define({ email, password, name, phoneNo });
  } else { // everyone else is just a user.
    UserProfiles.define({ email, password, name, phoneNo });
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role, name, phoneNo }) => createUser(email, password, role, name, phoneNo));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
