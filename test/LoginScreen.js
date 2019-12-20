var cfg = require('./const');

const LoginScreen = function() {
  const emailInput = element(by.id('inputEmailForm'));
  const passwordInput = element(by.id('inputPasswordForm'));

  this.get = function() {
    browser.get(`${cfg.baseUrl}/login`);
  };

  this.fillLogin = function(name) {
    element(by.id('inputEmailForm')).sendKeys(cfg.userName);
    element(by.id('inputPasswordForm')).sendKeys(cfg.userPass);
  };

  this.submitLogin = function(name) {
    return element(by.id('login-button')).click();
  };

  this.loginProcess = function() {
    this.get();
    this.fillLogin();
    return this.submitLogin();
  };
};

module.exports = new LoginScreen();
