import { Selector } from 'testcafe';

class BrowsePage {
  constructor() {
    this.pageId = '#browse-clubs-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then checks that filtering works. */
  async filter(testController) {
    await this.isDisplayed(testController);
    // Select visualization
    const interestsSelector = Selector('#selectInterests div.form-check input');
    // Show number of Clubs
    await testController.click('#numClubs');
    // Select the fourth checkbox (Honorary Society)
    await testController.click(interestsSelector.nth(3));
    // Select the tenth checkbox (Student Affairs)
    await testController.click(interestsSelector.nth(9));
    // Click "Apply"
    await testController.click('#selectInterestsApply input.btn.btn-primary');
    // Check that 15 cards are displayed.
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).eql(15);
    // Show number of Clubs
    await testController.click('#numClubs');
  }

  async verifyClub(testController, user, name) {
    // Select the club's ClubCard in the ClubCardList component.
    const browseClubCard = Selector('#browse-club-card').withText(name);
    // It should exist.
    await testController.expect(browseClubCard.exists).ok(`Check that ${user.name} can see ${name} ClubCard`);
    // And there should only be one of it.
    await testController.expect(browseClubCard.count).eql(1, `Check that ${user.name} can see only one ${name} ClubCard`);
  }

  async selectClubForEditing(testController, name) {
    // Select the club's ClubCard in the ClubCardList component.
    const browseClubCard = Selector('#browse-club-card').withText(name).parent();
    // Find the Edit Club Button on that club's ClubCard.
    const editClubButton = browseClubCard.find('#edit-club-link');
    await testController.click(editClubButton);
  }

}
export const browsePage = new BrowsePage();
