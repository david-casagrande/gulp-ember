import controller from 'gulp/controllers/releases/show';

export default describe('ReleasesShowController', function(){
	
	beforeEach(function(){
		controller = controller.create();
	});

	afterEach(function(){
		controller.destroy();
	});

	describe('foo', function(){
		it('is alive', function(){
			console.log(controller)
			expect(true).to.be.false;
		});
	});

});
