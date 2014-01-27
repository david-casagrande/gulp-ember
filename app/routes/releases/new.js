export default Ember.Route.extend({

	model: function(){
		return this.get('store').createRecord('release');
	},
	
	setupController: function(controller, model) {
		controller.setProperties({
			model: model,
			availableArtists: this.get('store').find('artist')
		});
	},

	deactivate: function(){
		if(this.get('controller.model.isNew')){
			this.get('controller.model').deleteRecord();
		}
	}

});
