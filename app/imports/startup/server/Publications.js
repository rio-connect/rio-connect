import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/club/Club';
import { Profiles } from '../../api/profile/Profile';
import { Interests } from '../../api/interests/Interests';
import { ProfilesInterests } from '../../api/profile/ProfileInterests';
import { ClubInterests } from '../../api/club/ClubInterests';
import { ProfileClubs } from '../../api/profile/ProfileClubs';

// Define a publication to publish all interests
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());

// Define a publication to publish profile interests
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

// Define a publication to publish Club Interests/type
Meteor.publish(ClubInterests.userPublicationName, () => ClubInterests.collection.find());

// Define a publication to publish profiles/clubs
Meteor.publish(ProfileClubs.userPublicationName, () => ProfileClubs.collection.find());

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
