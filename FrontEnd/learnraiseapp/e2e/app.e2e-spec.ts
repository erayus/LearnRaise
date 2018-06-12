import { StumartappPage } from './app.po';

describe('learnraiseapp App', () => {
  let page: StumartappPage;

  beforeEach(() => {
    page = new StumartappPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
