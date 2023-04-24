import { Selector } from 'testcafe';

class BrowsePage {
  constructor() {
    this.pageId = '#browseclub-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(6000).expect(this.pageSelector.exists).ok();
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
