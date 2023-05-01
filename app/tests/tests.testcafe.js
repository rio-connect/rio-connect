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

test('Test that BrowseClubsPage works for users', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, regularUser.username, regularUser.password);
  await navBar.gotoBrowseClubsPage(testController);
  await browsePage.isDisplayed(testController);
  // Test filtering
  await browsePage.filter(testController);
  await browsePage.clear(testController);
  // Test search bar
  await browsePage.search(testController);
  await browsePage.clear(testController);
  // Test create a club button
  await browsePage.createClubBtn(testController);
  await navBar.gotoAddClubsPage(testController);
  await addPage.isDisplayed(testController);
  // Logout
  await navBar.isLoggedIn(testController, regularUser.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
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
    await navBar.gotoSignInPage(testController);
    await signinPage.signin(testController, user.username, user.password);
    await navBar.isLoggedIn(testController, user.username);
    /** Go to the UserPage */
    await navBar.gotoUserPage(testController);
    /** Verify that the UserPage is correct */
    await userPage.validateUserPage(testController, user);
    /** Verify that the user can edit their profile information */
    await userPage.canEditProfileInformation(testController, user);
    /** Verify that the user can join/leave a club */
    await userPage.canJoinLeaveClub(testController, user);
    /** Log out */
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
  });
});
