import { Selector } from 'testcafe';

class AddPage {
  constructor() {
    this.pageId = '#addclub-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async add(testController) {
    await this.isDisplayed(testController);
    await testController.typeText('#add-form-name', 'Club3');
    await testController.typeText('#add-form-type', 'Game');
    await testController.typeText('#add-form-owner', 'John Smith');
    await testController.typeText('#add-form-mail', 'john@foo.com');
    await testController.typeText('#add-form-image', 'images/generic-club.png');
    await testController.typeText('#add-form-description', 'Test');
    await testController.click('#add-form-submit');
  }
}

export const addPage = new AddPage();
