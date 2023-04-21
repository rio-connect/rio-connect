import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/club/Club';
import { Profiles } from '../../api/profile/Profile';
import { Interests } from '../../api/interests/Interests';

/* eslint-disable no-console */

// Initialize the database with default clubs.
const addClubs = (club) => {
  console.log(`  Adding: ${club.name} (${club.owner})`);
  Clubs.collection.insert(club);
};

// Initialize the ClubsCollection if empty.
if (Clubs.collection.find().count() === 0) {
  if (Meteor.settings.loadDefaultClubs) {
    const clubsFileName = 'defaultClubs.json';
    console.log(`loading data from private/${clubsFileName}`);
    const jsonData = JSON.parse(Assets.getText(clubsFileName));
    jsonData.clubs.map(club => addClubs(club));
  }
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.forEach(club => addClubs(club));
  }
}

// Initialize the database with default profiles.
const addProfiles = (profile) => {
  console.log(`  Adding: ${profile.name}`);
  Profiles.collection.insert(profile);
};

// Initialize the ProfilesCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.forEach(profile => addProfiles(profile));
  }
}
