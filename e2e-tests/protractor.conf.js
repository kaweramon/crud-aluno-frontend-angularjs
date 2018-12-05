//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'teste1.spec.js'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  chromeOnly: true,
  baseUrl: 'http://localhost:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
