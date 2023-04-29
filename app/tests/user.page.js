import { Selector } from 'testcafe';

class UserPage {
  constructor() {
    this.pageId = '#user-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController, user) {
    await testController.expect(this.pageSelector.exists).ok(`Check that ${user.name} can see their UserPage`);
  }

  /** Checks that the user's profile information is correct. */
  async correctProfileInformation(testController, user) {
    await testController.expect(Selector('#user-contact-info').exists).ok(`Check that ${user.name} can see the UserContactInfo component`);
    await testController.expect(Selector('#user-name').value).eql(user.name);
    await testController.expect(Selector('#user-email').value).eql(user.username);
    await testController.expect(Selector('#user-phone').value).eql(user.phoneNo);
  }

  /** Checks that the user has access to all the clubs they are a member of. */
  async correctClubMembershipInformation(testController, user) {
    await testController.expect(Selector('#user-club-list').exists).ok(`Check that ${user.name} can see the UserClubList component`);
    /** Ensure that the number of UserClubCards match the number of clubs the user has joined. Admins have access to all 191 clubs, plus the additional club made in the add clubs test. */
    if (!user.isAdmin) {
      await testController.expect(Selector('#user-club-card').count).eql(user.joinedClubs.length, `Check that non-admin user ${user.name} can see ${user.joinedClubs.length} UserClubCard components`);
    } else {
      await testController.expect(Selector('#user-club-card').count).gte(192);
    }
    /** Check that, for each club the user has joined, there is a UserClubCard with that club name. */
    await Promise.all(user.joinedClubs.map(async (club) => {
      await testController.expect(Selector('#user-club-card-name').withText(club).exists).ok();
    }));
  }

  /** Checks that the user can edit all the clubs that they have permission to edit. */
  async correctClubEditingInformation(testController, user) {
    if (user.canEditClubs) {
      await testController.expect(Selector('#user-edit-club').exists).ok();
      await Promise.all(user.editableClubs.map(async (club) => {
        await testController.expect(Selector('#user-editable-clubs').find('option').withText(club).exists).ok(`Check that ${user.name} can edit ${club}`);
      }));
    } else {
      await testController.expect(Selector('#user-edit-club').exists).notOk(`Check that ${user.name} can't see the UserEditClubs component`);
    }
  }
}

export const userPage = new UserPage();
