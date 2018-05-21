import { DiantumPage } from './app.po';

describe('diantum App', () => {
  let page: DiantumPage;

  beforeEach(() => {
    page = new DiantumPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
