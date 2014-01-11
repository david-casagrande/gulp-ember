describe('Controller', function(){
	var controller;

	beforeEach(function(){
		controller = App.TestController.create();
	});

	afterEach(function(){
		controller.destroy();
	});

	describe('foo', function(){
		it('is true by default', function(){
			expect(controller.get('foo')).to.be.true;
		});		
	});

	describe('toggleFoo', function(){
		
		context('foo is true', function(){

			beforeEach(function(){
				controller.set('foo', true);
			});

			it('sets foo to false', function(){
				controller.toggleFoo();
				expect(controller.get('foo')).to.be.false;
			});					
		
		});

		context('foo is false', function(){
			
			beforeEach(function(){
				controller.set('foo', false);
			});

			it('sets foo to true', function(){
				controller.toggleFoo();
				expect(controller.get('foo')).to.be.true;
			});					
		
		});

	});

});