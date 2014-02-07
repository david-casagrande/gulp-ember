import app from 'gulp/app';

export default describe('ReleasesRoute', function(){
	
	beforeEach(function(){
	  var App;

	  var attributes = Ember.merge({
	    // useful Test defaults
	    rootElement: '#ember-testing',
	    LOG_ACTIVE_GENERATION:false,
	    LOG_VIEW_LOOKUPS: false
	  }); // but you can override;

	  Router.reopen({
	    location: 'none'
	  });

	  Ember.run(function(){
	    App = Application.create(attributes);
	    App.setupForTesting();
	    App.injectTestHelpers();
	  });
	});

	afterEach(function(){
		App.destroy();
	});

	describe('foo', function(){
		it('is alive', function(done){
			visit("/releases");
				andThen(function() {
			    expect(true).to.be.false;
			    done()
			  });
		});
	});

});
