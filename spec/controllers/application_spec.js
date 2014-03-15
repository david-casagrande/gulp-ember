//require('spec_helper')['default']();

describe("A test suite", function() {
  var controller;

  beforeEach(function() {
  	controller = require('gulp/controllers/application')['default'].create();
  });

  afterEach(function() {
  	controller.destroy();
  });
 
 	describe('modalReady', function(){
	  it('set to false by default', function() {
	    expect(controller.get('modalReady')).to.be.false;
	  });
 	});

 	describe('modalCancelRoute', function(){
	  it('set to null by default', function() {
	    expect(controller.get('modalCancelRoute')).to.be.null;
	  });
 	});

});