import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const regularUserCredentials = { username: 'emma@foo.com', password: 'changeme' };
const clubOwnerCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
const credentialsArray = [regularUserCredentials, clubOwnerCredentials, adminCredentials];

fixture('rio-connect localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, clubOwnerCredentials.username, clubOwnerCredentials.password);
  await navBar.isLoggedIn(testController, clubOwnerCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
