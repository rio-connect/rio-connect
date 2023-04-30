import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userPage } from './user.page';
import { browsePage } from './browse.page';
import { addPage } from './add.page';
import { editPage } from './edit.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const regularUser = {
  username: 'emma@foo.com',
  password: 'changeme',
  name: 'Emma Lee',
  phoneNo: '(808) 123-4567',
  canEditClubs: false,
  isAdmin: false,
  editableClubs: [],
  joinedClubs: ['Club1'],
};
const clubOwner = {
  username: 'john@foo.com',
  password: 'changeme',
  name: 'John Smith',
  phoneNo: '(808) 555-5555',
  canEditClubs: true,
  isAdmin: false,
  editableClubs: ['Club1'],
  joinedClubs: ['Club1', 'Club2'],
};
const admin = {
  username: 'admin@foo.com',
  password: 'changeme',
  name: 'Admin',
  phoneNo: '(808) 555-5555',
  canEditClubs: true,
  isAdmin: true,
  editableClubs: ['Club1', 'Club2'],
  joinedClubs: [],
};
const credentialsArray = [regularUser, clubOwner, admin];

fixture('rio-connect localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

credentialsArray.forEach((user) => {
  test(`Test that signin and signout work for ${user.name}`, async (testController) => {
    await navBar.gotoSignInPage(testController);
    await signinPage.signin(testController, user.username, user.password);
    await navBar.isLoggedIn(testController, user.username);
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
  });
});

test('Test the Browse Clubs page', async (testController) => {
  // await navBar.ensureLogout(testController);
  // await navBar.gotoSignInPage(testController);
  // await signinPage.signin(testController, regularUser.username, regularUser.password);
  await navBar.gotoBrowseClubsPage(testController);
  await browsePage.isDisplayed(testController);
  await browsePage.filter(testController);
});

test('Test that add and edit clubs work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, clubOwner.username, clubOwner.password);
  await navBar.isLoggedIn(testController, clubOwner.username);
  await navBar.gotoAddClubsPage(testController);
  await addPage.add(testController);
  /** Add the clubs' information to the clubOwner's profile. This is necessary for testing the UserPage.
   * Note that meteor reset must be run after every test, since the added club remains in the Mongo database. The UserPage tests check to see that the correct number of clubs is visible. */
  clubOwner.joinedClubs.push('Test Club');
  await navBar.gotoBrowseClubsPage(testController);
  await browsePage.isAdded(testController, 'Club1');
  await browsePage.edit(testController);
  await editPage.edit(testController);
  await navBar.gotoBrowseClubsPage(testController);
  await browsePage.isAdded(testController, 'Club3');
});

/** UserPage tests */
credentialsArray.forEach(user => {
  test.only(`Test the UserPage for ${user.username}`, async (testController) => {
    /** Sign in */
    await navBar.gotoSignInPage(testController);
    await signinPage.signin(testController, user.username, user.password);
    await navBar.isLoggedIn(testController, user.username);
    /** Go to the UserPage */
    await navBar.gotoUserPage(testController);
    /** Verify that the UserPage is correct */
    await userPage.isDisplayed(testController, user);
    await userPage.correctProfileInformation(testController, user);
    await userPage.correctClubMembershipInformation(testController, user);
    await userPage.correctClubEditingInformation(testController, user);
    /** Verify that the user can edit their profile information */
    await userPage.editProfileInformation(testController, user);
    await navBar.gotoBrowseClubsPage(testController);
    await navBar.gotoUserPage(testController);
    await userPage.verifyEditedProfileInformation(testController, user);
    await userPage.restoreProfileInformation(testController, user);
    await userPage.correctProfileInformation(testController, user);
    /** Log out */
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
  });
});
