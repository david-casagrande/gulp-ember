export default Ember.ObjectController.extend({
	
	foo: true,

	toggleFoo: function(){
		var currentFoo = this.get('foo');
		this.set('foo', !currentFoo);
	}

});
