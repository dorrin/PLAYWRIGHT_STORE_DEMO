import { test, expect, Page, type Locator as Locator, type FrameLocator } from '@playwright/test';

export class KabamStorePage {

    readonly page: Page;
    readonly gdprForm: Locator;
    readonly gdprSubmit: Locator;
    readonly menuButton: Locator;
    readonly menu: Locator;
    readonly firstBuyButton: Locator;
    readonly loginModalHidden: Locator;
    readonly loginModalButton: Locator;
    readonly loginModalClose: Locator;
    readonly loginButton: Locator;
    readonly loggedUser: Locator;
    readonly firstBuyButtonLogged: Locator;
    readonly firstBuyCard: Locator;
    readonly cardModal: Locator;
    readonly cardModalButton: Locator;
    readonly payStation: Locator;
    readonly payStationLoadSpinner: Locator;
    readonly payStationClose: Locator;
    readonly rewardSwiperPrev: Locator;
    readonly rewardSwiperNext: Locator;
    readonly activeSlide: Locator;
    readonly activeSlideAttribute: String;
    readonly rewardStepModal: Locator;
    readonly rewardClose: Locator;
    readonly rewardActiveClass: String
    readonly rewardPrevClass: String
    readonly promocodeInput: Locator;
    readonly promocodeSubmit: Locator;
    readonly promocodeDisabledSubmit: Locator;
    readonly promocodeError : Locator;
    readonly logoutButton: Locator;

    constructor(page: Page)  {

      this.page = page;
      this.gdprForm = page.locator('#gdpr-consent-form');
      this.gdprSubmit = page.locator('#submit-button');
      this.menuButton = page.locator('[id = "global-menu"]');
      this.menu = page.locator('[id = "menu"][class="open"]');
      this.firstBuyButton = page.locator('.new-store button').first();
      this.loginModalHidden = page.locator('[id="widget"][class = "login-widget-1st-generation--hidden"]');
      this.loginModalButton = page.frameLocator('iframe').locator('.primary-social_button div');
      this.loginModalClose = page.frameLocator('iframe').locator('.icon-element__remove');
      this.loginButton = page.locator('.login-button');
      this.loggedUser = page.locator('.header-logged-user');
      this.firstBuyButtonLogged = page.locator('[data-testid="buy-button"]').first();
      this.firstBuyCard = page.locator('.new-store-card ').first().filter({ has: this.firstBuyButtonLogged });
      this.cardModal = page.locator('.store-item-modal');
      this.cardModalButton = page.locator('.store-item-modal .button');
      this.payStation =  page.frameLocator('iframe').locator('.pay-button');
      this.payStationLoadSpinner = page.frameLocator('iframe').locator('.xpaystation-widget-lightbox-spinner');
      this.payStationClose = page.frameLocator('iframe').locator('[data-testid="close-iframe-button"]'); 
      this.rewardSwiperPrev =   page.locator('.swiper-button-prev');
      this.rewardSwiperNext =   page.locator('.swiper-button-next');
      this.activeSlide = page.locator('.swiper-slide-active');
      this.rewardStepModal =  page.locator('.step-card-modal');
      this.rewardClose =  page.locator('.step-card-modal__close');
      this.rewardActiveClass = 'swiper-slide swiper-slide-active';
      this.rewardPrevClass = 'swiper-slide swiper-slide-prev';
      this.promocodeInput = page.locator('.promocodes input');
      this.promocodeSubmit = page.locator('.promocodes button');
      this.promocodeDisabledSubmit = page.locator('.promocodes button.button--disabled');
      this.promocodeError  = page.locator('.promocodes-input__error');
      this.logoutButton =  page.locator('.logout-button-line--shown');
    }

   
  async initialActions(url:string) {
    await this.page.goto(url);

    try {
      await this.loginModalButton.waitFor({timeout: 5000});
      await this.loginModalClose.click();
      await this.loginModalButton.waitFor({state: "hidden",timeout: 2000});
    } catch {};

    try {
      await this.gdprForm.waitFor({timeout: 5000})
      await this.gdprSubmit.click();
      await this.gdprForm.waitFor({state: "hidden",timeout: 2000});
    } catch {};
    
  }
}

