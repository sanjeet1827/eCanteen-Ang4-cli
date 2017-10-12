import { ECanteenAng4Page } from './app.po';

describe('e-canteen-ang4 App', () => {
  let page: ECanteenAng4Page;

  beforeEach(() => {
    page = new ECanteenAng4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
