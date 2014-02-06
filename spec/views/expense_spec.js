import view from 'gulp/views/expense';

export default describe('ExpenseView', function(){
	
	beforeEach(function(){
		view = view.create();
	});

	afterEach(function(){
		view.destroy();
	});

	describe('foo', function(){
		it('is alive', function(){
			expect(view.get('tagName')).to.equal('tr');
		});
	});

});
