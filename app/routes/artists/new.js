export default Ember.Route.extend({

	model: function(){
		return this.get('store').createRecord('artist');
	},

	deactivate: function(){
		if(this.get('controller.model.isNew')){
			this.get('controller.model').deleteRecord();
		}
	}

});
