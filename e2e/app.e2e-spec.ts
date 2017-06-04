import { AlertsSmartSDKPage } from './app.po';

describe('alerts-smart-sdk App', () => {
  let page: AlertsSmartSDKPage;

  beforeEach(() => {
    page = new AlertsSmartSDKPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
