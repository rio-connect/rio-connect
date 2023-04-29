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
    // type in the text fields
    await testController.typeText('#add-form-name', 'Test Club');
    await testController.typeText('#add-form-owner', 'John Smith');
    await testController.typeText('#add-form-image', 'images/generic-club.png');
    await testController.typeText('#add-form-mail', 'john@foo.com');
    await testController.typeText('#add-form-description', 'Test');
    // Select a club type
    const typeSelector = Selector('#add-form-type');
    const selectOption = typeSelector().find('option');
    await testController.click(typeSelector());
    await testController.click(selectOption.withText('Political'));
    // submit the form
    await testController.click('#add-form-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addPage = new AddPage();
