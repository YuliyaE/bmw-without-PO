exports.config = {

    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    globalTimeout: 100000,
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    specs: [
        'bmw_tests/features/check_name.feature'
    ],

    onPrepare: function () {
        browser.manage().window().maximize();
    },

    cucumberOpts: {
        require: 'bmw_tests/bmw_steps.js',
        format: 'summary'
    }


};