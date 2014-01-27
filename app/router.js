var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {

	this.resource('artists', function(){
		this.route('new', { path: 'new' });
		this.route('show', { path: ':artist_id' });
	});

	this.resource('releases', { path: '/' }, function(){
		this.route('new', { path: 'new' } );
		this.route('show', { path: ':release_id' } );
	});

});

export default Router;
