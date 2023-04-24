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
    console.log(await interestsSelector.count);
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

  async isAdded(testController, name) {
    await this.isDisplayed(testController);
    await Selector('#club-card-name').withText(name);
  }

  async edit(testController) {
    await testController.click('#edit-club-link');
  }
}
export const browsePage = new BrowsePage();
