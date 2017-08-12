import { QPaperAppPage } from './app.po';

describe('qpaper-app App', () => {
  let page: QPaperAppPage;

  beforeEach(() => {
    page = new QPaperAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
