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
    await testController.typeText('#add-form-name', 'Test Club');
    await testController.typeText('#add-form-owner', 'John Smith');
    await testController.typeText('#add-form-mail', 'john@foo.com');
    await testController.typeText('#add-form-image', 'images/generic-club.png');
    await testController.typeText('#add-form-description', 'Test');
    // const typeSelector = Selector('#add-form-type');
    // const lastCheckbox = Selector('fieldset p:last-child [type="checkbox"]');
    const typeSelect = Selector('#add-form-type');
    const typeOption = typeSelect.find('option');
    await testController.click('typeSelect');
    await testController.click(typeOption.withText('Political'));
    await testController.expect(typeSelect.value).eql('Political');
    await testController.click('#add-form-submit');
  }
}

// fixture `Select element manipulation`
//   .page `./index.html`;
//
// const citySelect = Selector('#city');
// const cityOption = citySelect.find('option');
//
// test('Select an option from the drop-down menu', async t => {
//   await t
//     .click(citySelect)
//     .click(cityOption.withText('London'))
//     .expect(citySelect.value).eql('London');
// });

export const addPage = new AddPage();
