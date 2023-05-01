import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class UserPage {
  constructor() {
    this.pageId = '#user-page';
    this.pageSelector = Selector(this.pageId);
  }

  async validateUserPage(testController, user) {
    /** Checks that this page is currently displayed. */
    console.log('performing test: this.isDisplayed');
    await testController.expect(this.pageSelector.exists).ok(`Check that ${user.name} can see their UserPage`);
    console.log('performing test: this.correctProfileInformation');
    await this.correctProfileInformation(testController, user);
    console.log('performing test: this.correctClubMembershipInformation');
    await this.correctClubMembershipInformation(testController, user);
    /** Checks that the user can edit all the clubs that they have permission to edit. */
    console.log('performing test: this.correctClubEditingInformation');
    if (user.canEditClubs) {
      // For each club the user can edit:
      await user.editableClubs.reduce(async (previousPromise, club) => {
        await previousPromise;
        // Select the club's ClubCard in the ClubCardList component.
        const userClubCard = Selector('#user-club-card').withText(club);
        await testController.expect(userClubCard.exists).ok(`Check that ${user.name} can see ${club} UserClubCard`);
        // Find the Edit Club Button on that club's ClubCard.
        const editClubButton = userClubCard.find('#edit-club-link');
        await testController.click(editClubButton);
        // Verify that the EditClub component on EditClubPage is prefilled with the correct information.
        await testController.expect(Selector('#edit-form-name')().value).eql(club, `Ensure the EditClub form is pre-filled with ${club}'s information`);
        await navBar.gotoUserPage(testController);
      }, Promise.resolve());
    }
  }

  async canEditProfileInformation(testController, user) {
    console.log('performing test: this.editProfileInformation');

    /** Edit the user's profile information to junk data. */
    await testController.expect(Selector('#user-contact-info').exists).ok(`Check that ${user.name} can edit the UserContactInfo component`);
    console.log('In editProfileInformation:');
    console.log(await Selector('#user-name').value);
    console.log(await Selector('#user-phone').value);
    await testController.selectText(Selector('#user-name')).typeText(Selector('#user-name'), 'Abc123');
    await testController.selectText(Selector('#user-phone')).typeText(Selector('#user-phone'), '111-222-3333');
    await testController.click(Selector('#user-update-profile .btn'));
    await testController.click('.swal-button--confirm');
    console.log('In editProfileInformation:');
    console.log(await Selector('#user-name').value);
    console.log(await Selector('#user-phone').value);
    console.log('performing test: navBar.gotoBrowseClubsPage');

    /** Navigate from and to the UserPage to make sure the values stick */
    await navBar.gotoBrowseClubsPage(testController);
    console.log('performing test: navBar.gotoUserPage');
    await navBar.gotoUserPage(testController);

    /** Validate that the junk data is saved to the user's profile. */
    console.log('performing test: this.verifyEditedProfileInformation');
    await testController.expect(Selector('#user-contact-info').exists).ok(`Check that ${user.name} can edit the UserContactInfo component`);
    console.log('In verifyEditedProfileInformation:');
    console.log(await Selector('#user-name').value);
    console.log(await Selector('#user-phone').value);
    await testController.expect(Selector('#user-name').value).eql('Abc123');
    await testController.expect(Selector('#user-phone').value).eql('111-222-3333');

    /** Restore the user's original profile information. */
    console.log('performing test: this.restoreProfileInformation');
    await testController.expect(Selector('#user-contact-info').exists).ok(`Check that ${user.name} can edit the UserContactInfo component`);
    console.log('In restoreProfileInformation:');
    console.log(await Selector('#user-name').value);
    console.log(await Selector('#user-phone').value);
    await testController.selectText(Selector('#user-name')).typeText(Selector('#user-name'), user.name);
    await testController.selectText(Selector('#user-phone')).typeText(Selector('#user-phone'), user.phoneNo);
    await testController.click(Selector('#user-update-profile .btn'));
    await testController.click('.swal-button--confirm');
    // Verify that the text boxes have been updated to have the correct value.
    console.log('In restoreProfileInformation:');
    console.log(await Selector('#user-name').value);
    console.log(await Selector('#user-phone').value);

    console.log('performing test: this.correctProfileInformation');
    await this.correctProfileInformation(testController, user);
  }

  async canJoinLeaveClub(testController, user) {
    /** Leave a club. */
    console.log('performing test: this.verifyLeaveClub');
    if (user.isAdmin) {
      // An Admin user is not a member of any club, and thus should not be able to leave any club.
      await testController.expect(Selector('#leave-club-btn').exists).notOk('Ensure that Admin user cannot leave any club');
    } else {
      // Check that there is a Leave Club button for each club the user has joined.
      await testController.expect(Selector('#leave-club-btn').count).eql(user.joinedClubs.length, `Check that non-admin user ${user.name} can see ${user.joinedClubs.length} Leave Club buttons`);
      // For each club the user is a member of:
      await user.joinedClubs.reduce(async (previousPromise, club) => {
        await previousPromise;
        // Select the club's ClubCard in the ClubCardList component.
        const userClubCard = Selector('#user-club-card').withText(club);
        await testController.expect(userClubCard.exists).ok(`Check that ${user.name} can see ${club} UserClubCard`);
        // Find the Leave Club Button on that club's ClubCard.
        const leaveClubButton = userClubCard.find('#leave-club-btn');
        // Try to leave that club.
        await testController.click(leaveClubButton);
        await testController.click(Selector('.swal-button--confirm'));
        if (user.editableClubs.includes(club)) {
          // A user should not be able to leave a club they own.
          await testController.click(Selector('.swal-button--cancel'));
          await testController.expect(userClubCard.exists).ok(`Check that ${user.name} can still see ${club} UserClubCard`);
        } else {
          await testController.click(Selector('.swal-button--confirm'));
          // Verify that the ClubCard for that club is no longer visible.
          await testController.expect(userClubCard.exists).notOk(`Check that ${user.name} can no longer see ${club} UserClubCard`);
        }
      }, Promise.resolve());
      // Verify that the only clubs the user can see now are those that they own.
      await testController.expect(Selector('#user-club-card').count).eql(user.editableClubs.length, `Check that non-admin user ${user.name} can see ${user.editableClubs.length} UserClubCard components`);
    }
    /** Rejoin all clubs that were left in the previous test. */
    console.log('performing test: this.verifyJoinClub');
    // Admins cannot join clubs.
    if (!user.isAdmin) {
      await navBar.gotoBrowseClubsPage(testController);
      // Determine an array of the clubs to rejoin.
      const rejoinList = user.joinedClubs.filter(club => !user.editableClubs.includes(club));
      // For each club the user must rejoin:
      await rejoinList.reduce(async (previousPromise, club) => {
        await previousPromise;
        // Select the club's ClubCard in the ClubCardList component.
        const browseClubCard = Selector('#browse-club-card').withText(club).parent();
        await testController.expect(browseClubCard.exists).ok(`Check that ${user.name} can see ${club} ClubCard`);
        // Find the Join Club Button on that club's ClubCard.
        const joinClubButton = browseClubCard.find('#join-club-btn');
        await testController.click(joinClubButton);
      }, Promise.resolve());
      await navBar.gotoUserPage(testController);
    }
    console.log('performing test: this.correctClubMembershipInformation');
    await this.correctClubMembershipInformation(testController, user);
  }

  /** Checks that the user's profile information is correct. */
  async correctProfileInformation(testController, user) {
    await testController.expect(Selector('#user-contact-info').exists).ok(`Check that ${user.name} can see the UserContactInfo component`);
    console.log('In correctProfileInformation:');
    console.log(await Selector('#user-name').value);
    console.log(await Selector('#user-phone').value);
    await testController.expect(Selector('#user-name').value).eql(user.name);
    await testController.expect(Selector('#user-email').value).eql(user.username);
    await testController.expect(Selector('#user-phone').value).eql(user.phoneNo);
  }

  /** Checks that the user has access to all the clubs they are a member of. */
  async correctClubMembershipInformation(testController, user) {
    await testController.expect(Selector('#user-club-list').exists).ok(`Check that ${user.name} can see the UserClubList component`);
    /** Ensure that the number of UserClubCards match the number of clubs the user has joined. Admins have access to all 191 clubs. */
    if (!user.isAdmin) {
      await testController.expect(Selector('#user-club-card').count).eql(user.joinedClubs.length, `Check that non-admin user ${user.name} can see ${user.joinedClubs.length} UserClubCard components`);
    } else {
      await testController.expect(Selector('#user-club-card').count).eql(191);
    }
    /** Check that, for each club the user has joined, there is a UserClubCard with that club name. */
    await Promise.all(user.joinedClubs.map(async (club) => {
      await testController.expect(Selector('#user-club-card-name').withText(club).exists).ok(`Check that ${user.name} can see ${club} UserClubCard`);
    }));
  }
}

export const userPage = new UserPage();
