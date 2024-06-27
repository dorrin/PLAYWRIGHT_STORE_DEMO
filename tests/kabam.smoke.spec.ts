import { test, expect, Page, type Locator } from '@playwright/test';
import { KabamStorePage } from '../pages-model/store.page.model';
import { KabamAuthPage } from '../pages-model/auth.page.model';


test.describe('Kabam landing smoke test', () => {

  let page: Page;

  const baseUrl = 'https://store.playcontestofchampions.com/';

  const testUser = {
    login : 'doesnotexistfortest@test.test',
    password : 'kQmn34_sD'
  };

  const getNewPage = async (page: Page, button: Locator) => {
    const cntxt = page.context();
    const pagePromise = cntxt.waitForEvent('page');
    await button.click(); 
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    return newPage;
  } 

  const promocodes = {
    incorrectPromo : 'incorrectcode',
    errorText : 'Incorrect code'
  }


  test.describe('Unlogged checking', () => {

    let storePage;

    test.beforeAll('Open Page', async ({browser}) => {
      page = await browser.newPage();
      storePage = new KabamStorePage(page);
      await storePage.initialActions(baseUrl);
    })

    test.afterAll(async () => {
      await page.context().clearCookies();
      await page.close();
    });


    test('Checking menu', async () => {
      await storePage.menuButton.click();
      await expect(storePage.menu).toBeVisible();
      await storePage.menuButton.click();
      await expect(storePage.menu).toBeHidden(); 
    })

    test('Сhecking login modal when clicking buy something', async () => {
      await storePage.firstBuyButton.scrollIntoViewIfNeeded();
      await storePage.firstBuyButton.click();
      await storePage.loginModalButton.waitFor({timeout: 5000});
      await storePage.loginModalClose.click();
      await storePage.loginModalButton.waitFor({state: "hidden",timeout: 2000});
    })

    test('Сhecking login modal when clicking promocode', async () => {
      await storePage.promocodeInput.scrollIntoViewIfNeeded();
      await storePage.promocodeInput.fill(promocodes.incorrectPromo);
      await storePage.promocodeDisabledSubmit.waitFor({state: "hidden", timeout: 2000});
      await storePage.promocodeSubmit.click();
      await storePage.loginModalButton.waitFor({timeout: 5000});
      await storePage.loginModalClose.click();
      await storePage.loginModalButton.waitFor({state: "hidden",timeout: 2000})
    })

  })

  test.describe.only('Logget checking', () => {

    let storePage;

    test.describe.configure({ mode: 'serial' });

    test.beforeAll('Open Page', async ({browser}) => {
      page = await browser.newPage();
      storePage = new KabamStorePage(page);
      await storePage.initialActions(baseUrl);
    })

    test.afterAll(async () => {
      await page.context().clearCookies();
      await page.close();
    });

    test('Checking login to store', async () => {
      await storePage.loginButton.scrollIntoViewIfNeeded();
      await storePage.loginButton.click();
      await storePage.loginModalButton.waitFor({timeout: 5000});
      const newPage = await getNewPage(page,storePage.loginModalButton);
      const loginPage = new KabamAuthPage(newPage);
      await loginPage.fillLoginForm(testUser.login, testUser.password);
      await loginPage.submitButton.click();
      await page.waitForLoadState();
      await storePage.loggedUser.waitFor({timeout: 5000}); 
    })


    test('Checking reward simple steps' , async () => {
      const activeSlideIndex = await storePage.activeSlide.getAttribute('data-swiper-slide-index');
      const activeSlideByIndex = page.locator(`[data-swiper-slide-index = "${activeSlideIndex}"]`);
      await storePage.activeSlide.click()
      await storePage.rewardStepModal.waitFor({timeout: 5000}); 
      await storePage.rewardClose.click();
      await expect(storePage.rewardStepModal).toHaveCount(0);
      await storePage.rewardSwiperNext.click();
      await expect(activeSlideByIndex).toHaveClass(storePage.rewardPrevClass);
      await storePage.rewardSwiperPrev.click();
      await expect(activeSlideByIndex).toHaveClass(storePage.rewardActiveClass);
    })

    test('Checking promocode error', async () => {
      await storePage.promocodeInput.scrollIntoViewIfNeeded();
      await storePage.promocodeInput.fill(promocodes.incorrectPromo);
      await storePage.promocodeDisabledSubmit.waitFor({state: "hidden", timeout: 2000});
      await storePage.promocodeSubmit.click();
      await storePage.promocodeError.waitFor({timeout: 5000});
      await expect(storePage.promocodeError).toContainText(promocodes.errorText);
    })

    test('Checking buy steps with open paystation', async () => {
      await storePage.firstBuyCard.scrollIntoViewIfNeeded();
      await storePage.firstBuyCard.click();
      await storePage.cardModal.waitFor({timeout: 5000});
      await storePage.cardModalButton.click();
      await storePage.payStationLoadSpinner.waitFor({state: "hidden", timeout: 6000});
      await storePage.payStationClose.waitFor({timeout: 10000});
      await storePage.payStationClose.click();
      await expect(storePage.payStationClose).toBeHidden();
    })

    test('Checking logout', async () => {
      await storePage.loggedUser.click();
      await storePage.logoutButton.click();
      await storePage.loggedUser.waitFor({state: "hidden", timeout: 5000});
      await storePage.loginModalButton.waitFor({timeout: 2000})
    })
  })
})



  

