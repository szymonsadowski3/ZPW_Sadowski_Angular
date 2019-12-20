var cfg = require('./const');

const TripsScreen = function() {
  this.getTrips = function() {
    return element.all(by.css('.single-wycieczka'));
  };

  this.getFirstTrip = function() {
    return this.getTrips()[0];
  };

  this.get = function() {
    browser.get(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  };
};

module.exports = new TripsScreen();
