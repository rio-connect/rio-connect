import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userPage } from './user.page';

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

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, clubOwner.username, clubOwner.password);
  await navBar.isLoggedIn(testController, clubOwner.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

/** UserPage tests */
credentialsArray.forEach(user => {
  test(`Test that the UserPage loads for ${user.username}`, async (testController) => {
    await navBar.gotoSignInPage(testController);
    await signinPage.signin(testController, user.username, user.password);
    await navBar.isLoggedIn(testController, user.username);
    await navBar.gotoUserPage(testController);
    await userPage.isDisplayed(testController);
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
  });
});

credentialsArray.forEach(user => {
  test(`Test that the UserPage displays correct information for ${user.username}`, async (testController) => {
    await navBar.gotoSignInPage(testController);
    await signinPage.signin(testController, user.username, user.password);
    await navBar.isLoggedIn(testController, user.username);
    await navBar.gotoUserPage(testController);
    await userPage.isDisplayed(testController);
    await userPage.correctProfileInformation(testController, user);
    await userPage.correctClubMembershipInformation(testController, user);
    await userPage.correctClubEditingInformation(testController, user);
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
  });
});
