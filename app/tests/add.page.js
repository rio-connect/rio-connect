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
    // check a club type
    // const typeSelector = Selector(Selector('label').withText('Political'));
    // await testController.click(typeSelector);
    await testController.click('#add-form-type');
    const typeSelector = Selector(Selector('option').withText('Political'));
    await testController.click(typeSelector);
    // submit the form
    await testController.click('#add-form-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addPage = new AddPage();
