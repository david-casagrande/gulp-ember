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

after(function(){
	Ember.run(function(){
		App.destroy();
	});
});
