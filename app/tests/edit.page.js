import { Selector } from 'testcafe';

class EditPage {
  constructor() {
    this.pageId = '#addclub-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editClub(testController, newClubName) {
    await this.isDisplayed(testController);
    // Overwrite the club's name with the inputted text.
    await testController.selectText(Selector('#edit-form-name')).typeText(Selector('#edit-form-name'), newClubName);
    // await testController.click('#edit-form-type');
    // const typeSelector = Selector(Selector('option').withText('Political'));
    // await testController.click(typeSelector);
    // Submit the form.
    await testController.click('#edit-form-submit .btn');
    await testController.click(Selector('button').withText('OK'));
  }

  async deleteClub(testController, name) {
    // Press the Delete Club Button and confirmation buttons.
    await testController.click('#delete-club-btn');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click(Selector('.swal-button--confirm'));
    // Select the club's ClubCard in the ClubCardList component.
    const browseClubCard = Selector('#browse-club-card').withText(name);
    // It should not exist.
    await testController.expect(browseClubCard.exists).notOk(`Check that ${name} ClubCard no longer exists`);
  }
}

export const editPage = new EditPage();
