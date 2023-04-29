import { Selector } from 'testcafe';

class EditPage {
  constructor() {
    this.pageId = '#addclub-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async edit(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#edit-form-name', 'Club3');
    // await testController.click('#edit-form-type');
    // const typeSelector = Selector(Selector('option').withText('Political'));
    // await testController.click(typeSelector);
    await testController.click('#edit-form-submit');
  }
}

export const editPage = new EditPage();
