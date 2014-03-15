define('spec_helper', ['gulp/app', 'exports'],
  function(__dependency1__, __exports__) {
    "use strict";
    __exports__["default"] = function(){
      var App = __dependency1__["default"];
      console.log(App)
      App.deferReadiness();
      App.setupForTesting();
      App.injectTestHelpers();
      /*
      App.Router.reopen({
        location: 'none'
      });

      App.ApplicationAdapter = DS.FixtureAdapter.extend({
        simulateRemoteResponse: false
      });

      Ember.Test.adapter = Ember.Test.Adapter.create({});

      after(function(){
        Ember.run(function(){
          App.destroy();
        });
      });
      */
    }
});

/*
App.deferReadiness();
App.setupForTesting();
App.injectTestHelpers();

App.reopen({
  LOG_ACTIVE_GENERATION:    false,
  LOG_MODULE_RESOLVER:      false,
  LOG_TRANSITIONS:          false,
  LOG_TRANSITIONS_INTERNAL: false,
  LOG_VIEW_LOOKUPS:         false
});

App.Router.reopen({
  location: 'none'
});

//use this instead of the default qunit adapter
Ember.Test.adapter = Ember.Test.Adapter.create({});

App.ApplicationAdapter = DS.FixtureAdapter.extend({
	simulateRemoteResponse: false
});


*/