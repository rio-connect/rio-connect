import { Selector } from 'testcafe';

class EditPage {
  constructor() {
    this.pageId = '#addclub-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    // This is first test to be run. Wait 60 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(6000).expect(this.pageSelector.exists).ok();
  }

  async edit(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-form-name', 'Club3');
    await testController.click('#edit-form-submit');
  }
}

export const editPage = new EditPage();
