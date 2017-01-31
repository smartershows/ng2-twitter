import { Ng2TwitterPage } from './app.po';

describe('ng2-twitter App', function() {
  let page: Ng2TwitterPage;

  beforeEach(() => {
    page = new Ng2TwitterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
