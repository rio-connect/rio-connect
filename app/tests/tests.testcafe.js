import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const regularUser = { username: 'emma@foo.com', password: 'changeme', name: 'Emma Lee', phoneNo: '(808) 123-4567' };
const clubOwner = { username: 'john@foo.com', password: 'changeme', name: 'John Smith', phoneNo: '(808) 555-5555' };
const admin = { username: 'admin@foo.com', password: 'changeme', name: 'Admin', phoneNo: '(808) 555-5555' };
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
