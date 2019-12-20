var cfg = require('./const');
var loginScreen = require('./LoginScreen');
var tripsScreen = require('./TripsScreen');
// at the top of the test spec:
var fs = require('fs');

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
  var stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}


describe('Wycieczki app', function() {
  it('Should open without crashing', function() {
    browser.driver.get(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  });

  it('Should have a title', function() {
    browser.waitForAngularEnabled(true);
    browser.get(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
    browser.waitForAngularEnabled(false);

    expect(browser.getTitle()).toEqual('Wycieczki');
  });

  it('Should allow user to log-in and redirect him to main page', function() {
    loginScreen.loginProcess().then(() => {
      return browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
          return url.includes(cfg.mainPageEndpoint);
        });
      }, 10000);
    });
  });

  it('Should display available trips to the logged-in user', function() {
    loginScreen.loginProcess().then(() => {
      browser.sleep(8000).then(
        () => {
          tripsScreen.get();
          expect(tripsScreen.getTrips().count()).toBeGreaterThan(0);
        }
      )
    });
  });

  it('Should allow user to view trip details', function() {
    loginScreen.loginProcess().then(() => {
      browser.sleep(8000).then(
        () => {
          tripsScreen.get();
          tripsScreen.getFirstTrip().click();
        }
      )
    });
  });
});
