import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/club/Club';
import { Profiles } from '../../api/profile/Profile';

// Public publication.
// If not logged in, then only publish info about clubs that is publicly available (no members list).
Meteor.publish(Clubs.publicPublicationName, function () {
  return Clubs.collection.find({}, { members: 0 });
});

// User-level publication.
// If logged in, then publish clubs this user is a member of. Otherwise publish nothing.
Meteor.publish(Clubs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Clubs.collection.find({ members: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all clubs. Otherwise publish nothing.
Meteor.publish(Clubs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Clubs.collection.find();
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish the profile belonging to this user. Otherwise publish nothing.
Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ email: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all profiles. Otherwise publish nothing.
Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
