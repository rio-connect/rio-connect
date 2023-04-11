import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

const createUser = (email, password, role, name) => {
  console.log(`  Creating user ${name} ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    name: name,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
};

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role, name }) => createUser(email, password, role, name));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
