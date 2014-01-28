export default Ember.Route.extend({

	contextDidChange: function(){
    this.rollbackModel(this.currentModel);
    this._super();
  },

	deactivate: function(){
		this.rollbackModel(this.get('controller.model'));
	},

	rollbackModel: function(model){
		if(model && model.get('isDirty')){
			model.rollback();
		}
	}

});
