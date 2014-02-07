import view from 'gulp/views/expense';
import artist from 'gulp/fixtures/artist';

export default describe('ExpenseView', function(){
	
	beforeEach(function(){
		view = view.create();
	});

	afterEach(function(){
		view.destroy();
	});

	describe('foo', function(){
		it('is alive', function(){
			console.log(artist(), artist());
			expect(artist()).to.not.eql(artist({id: 2}));
		});
	});

});
