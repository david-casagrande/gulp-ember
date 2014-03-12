describe('AristsRoute', function(){
	var artists = App.Artist.FIXTURES;

	beforeEach(function(){
		App.reset();
		Ember.run(function(){
			App.advanceReadiness();
		});
	});


	describe('model', function(){
		it('gets all releases', function(done){
			visit('/artists');
		  andThen(function() {
		  	var controller = App.__container__.lookup('controller:artists');
				expect(controller.get('length')).to.equal(artists.get('length'));
				done();
		  });
		});
	});

	describe('actions::saveArtist', function(){
		it('calls saveArtist with passed record and "artists.show"', function(done){
			visit('/artists');
		  andThen(function() {
		  	var route  = App.__container__.lookup('route:artists'),
		  			stub   = sinon.stub(route, 'saveRecord'),
		  			record = artists.objectAt(0);

		  	route.send('saveArtist', record);
		  	expect(stub.calledWith(record, 'artists.show')).to.be.true;
		  	stub.restore();
				done();
		  });
		});
	});

	describe('actions::deleteArtist', function(){
		it('calls deleteRecord with passed record and "artists.index"', function(done){
			visit('/artists');
		  andThen(function() {
		  	var route  = App.__container__.lookup('route:artists'),
		  			stub   = sinon.stub(route, 'deleteRecord'),
		  			record = artists.objectAt(0);

		  	route.send('deleteArtist', record);
		  	expect(stub.calledWith(record, 'artists.index')).to.be.true;
		  	stub.restore();
				done();
		  });
		});
	});

	describe('deleteRecordSuccess', function(){
		it('calls deleteArtistReleases and _super', function(done){
			visit('/artists');
		  andThen(function() {
		  	var route   = App.__container__.lookup('route:artists'),
		  			record  = App.__container__.lookup('controller:artists').get('model.firstObject'),
		  			stub    = sinon.stub(route, 'deleteArtistReleases');

		  	route.deleteRecordSuccess(record);
		  	expect(stub.calledOnce).to.be.true;
		  	stub.restore();
				done();
		  });
		});
	});

	describe('deleteArtistReleases', function(){
		it('calls deleteRecord for each artist\'s release', function(done){
			visit('/artists');
		  andThen(function() {
		  	var route   = App.__container__.lookup('route:artists'),
		  			record  = App.__container__.lookup('controller:artists').get('model.firstObject'),
		  			release = record.get('releases.firstObject'),
		  			stub    = sinon.stub(release, 'deleteRecord');

		  	route.deleteArtistReleases(record);
		  	expect(stub.calledOnce).to.be.true;
		  	stub.restore();
				done();
		  });
		});
	});

});
