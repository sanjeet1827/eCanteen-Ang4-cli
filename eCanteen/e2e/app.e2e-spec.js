import { ECanteenAng4Page } from './app.po';
describe('e-canteen-ang4 App', () => {
    let page;
    beforeEach(() => {
        page = new ECanteenAng4Page();
    });
    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!!');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map