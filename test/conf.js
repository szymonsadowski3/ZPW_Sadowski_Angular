var cfg = require('./const');

// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  onPrepare: () => {
    browser.get(cfg.baseUrl);
  },
};
