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
  /** Sign in as the club owner user */
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, clubOwner.username, clubOwner.password);
  await navBar.isLoggedIn(testController, clubOwner.username);
  /** Add a new club called 'TestClub'. */
  await navBar.gotoAddClubsPage(testController);
  await addPage.addClub(testController);
  await navBar.gotoBrowseClubsPage(testController);
  await browsePage.verifyClub(testController, clubOwner, 'Test Club');
  /** Edit the newly added Test Club to have a new name, Club3. */
  await browsePage.selectClubForEditing(testController, 'Test Club');
  await editPage.editClub(testController, 'Club3');
  /** Verify that the club's name is now 'Club3' and not 'Test Club'. */
  await navBar.gotoBrowseClubsPage(testController);
  await browsePage.verifyClub(testController, clubOwner, 'Club3');
  /** Delete 'Club3' to ensure invariance between tests. */
  await browsePage.selectClubForEditing(testController, 'Club3');
  await editPage.deleteClub(testController, 'Club3');
  /** Log out */
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

/** UserPage tests */
credentialsArray.forEach(user => {
  test(`Test that the UserPage displays correct information for ${user.username}`, async (testController) => {
    /** Sign in */
    console.log('performing test: navBar.gotoSignInPage');
    await navBar.gotoSignInPage(testController);
    console.log('performing test: signinPage.signin');
    await signinPage.signin(testController, user.username, user.password);
    console.log('performing test: navBar.isLoggedIn');
    await navBar.isLoggedIn(testController, user.username);
    /** Go to the UserPage */
    console.log('performing test: navBar.gotoUserPage');
    await navBar.gotoUserPage(testController);
    /** Verify that the UserPage is correct */
    console.log('performing test: userPage.isDisplayed');
    await userPage.isDisplayed(testController, user);
    console.log('performing test: userPage.correctProfileInformation');
    await userPage.correctProfileInformation(testController, user);
    console.log('performing test: userPage.correctClubMembershipInformation');
    await userPage.correctClubMembershipInformation(testController, user);
    console.log('performing test: userPage.correctClubEditingInformation');
    await userPage.correctClubEditingInformation(testController, user);
    /** Verify that the user can edit their profile information */
    console.log('performing test: userPage.editProfileInformation');
    await userPage.editProfileInformation(testController, user);
    console.log('performing test: navBar.gotoBrowseClubsPage');
    await navBar.gotoBrowseClubsPage(testController);
    console.log('performing test: navBar.gotoUserPage');
    await navBar.gotoUserPage(testController);
    console.log('performing test: userPage.verifyEditedProfileInformation');
    await userPage.verifyEditedProfileInformation(testController, user);
    console.log('performing test: userPage.restoreProfileInformation');
    await userPage.restoreProfileInformation(testController, user);
    console.log('performing test: userPage.correctProfileInformation');
    await userPage.correctProfileInformation(testController, user);
    /** Verify that the user can leave a club */
    console.log('performing test: userPage.verifyLeaveClub');
    await userPage.verifyLeaveClub(testController, user);
    /** Verify that the user can join a club */
    console.log('performing test: userPage.verifyJoinClub');
    await userPage.verifyJoinClub(testController, user);
    console.log('performing test: userPage.correctClubMembershipInformation');
    await userPage.correctClubMembershipInformation(testController, user);
    /** Log out */
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
  });
});
