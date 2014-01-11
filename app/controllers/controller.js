App.TestController = Em.ObjectController.extend({
	
	foo: true,

	toggleFoo: function(){
		var currentFoo = this.get('foo');
		this.set('foo', !currentFoo);
	}

});
