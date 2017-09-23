import { TranslationToolPage } from './app.po';

describe('translation-tool App', () => {
  let page: TranslationToolPage;

  beforeEach(() => {
    page = new TranslationToolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
