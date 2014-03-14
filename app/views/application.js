export default Ember.View.extend({
	
	classNames: ['application-view'],
	
	didInsertElement: function(){
		this.controller.set('modalReady', true);
	}

});
