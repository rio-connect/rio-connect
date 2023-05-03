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
    // Select visualization
    const interestsSelector = Selector('#selectInterests div.form-check input');
    // Select the fourth checkbox (Honorary Society)
    await testController.click(interestsSelector.nth(3));
    await testController.wait(500);
    // Select the tenth checkbox (Student Affairs)
    await testController.click(interestsSelector.nth(9));
    await testController.wait(500);
    // Click "Apply" button
    await testController.click('#selectInterestsApply input.btn.btn-primary');
    await testController.wait(500);
    // Check that 15 cards are displayed.
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).eql(15);
  }

  async clear(testController) {
    // Click "Clear" button
    await testController.click('#clearFilterBtn');
    // Check that 191 cards are displayed.
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).eql(191);
  }

  async search(testController) {
    // Type "anime" into search bar
    await testController.selectText(Selector('#searchBar')).typeText(Selector('#searchBar'), 'anime');
    // Click "Apply" button
    await testController.click('#selectInterestsApply input.btn.btn-primary');
    // Check that only a single card is displayed.
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).eql(1);
  }

  async joinClub(testController) {
    // Select the first club
    const firstClub = 'Academy of Creative Media Student Association';
    const firstClubCard = Selector('#browse-club-card').withText(firstClub).parent();
    // Click "Join Club" button
    const joinClubButton = firstClubCard.find('#join-club-btn');
    await testController.click(joinClubButton);
  }

  async leaveClub(testController) {
    // Select the first club
    const firstClub = 'Academy of Creative Media Student Association';
    const firstClubCard = Selector('#browse-club-card').withText(firstClub).parent();
    // Click "Leave Club" button
    const leaveClubButton = firstClubCard.find('#leave-club-btn');
    await testController.click(leaveClubButton);
    await testController.click('.swal-button--confirm');
    await testController.click('.swal-button--confirm');
  }

  async correctNumOfJoinedClubs(testController, user, numOfJoinedClubs) {
    await testController.expect(Selector('#user-club-list').exists).ok();
    await testController.expect(Selector('#user-club-card').count).eql(numOfJoinedClubs);
  }

  async createClubBtn(testController) {
    // Click "Create a Club!" button
    await testController.click('#createClubLink');
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
