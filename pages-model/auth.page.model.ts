import { test, expect, Page, type Locator, type FrameLocator } from '@playwright/test';

export class KabamAuthPage {

    readonly page: Page;
    readonly authForm: Locator
    readonly authFormEmail: Locator
    readonly authFormPassword: Locator
    readonly submitButton: Locator

    constructor(page: Page)  {
      this.authForm = page.locator('[action = "/v1/oauth2/authorize"]');
      this.authFormEmail = page.locator('[type = "email"]');
      this.authFormPassword = page.locator('[type = "password"]');
      this.submitButton = page.locator('[id="submit-button"]'); 
    }

    async fillLoginForm(login:string, pass:string) {
     await this.authForm.waitFor({timeout: 5000});
     await this.authFormEmail.focus();
     await this.authFormEmail.fill(login);
     await this.authFormPassword.focus();
     await this.authFormPassword.fill(pass);
    }

}

