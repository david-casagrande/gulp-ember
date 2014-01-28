import CRUD from 'gulp/mixins/route_crud';

export default Ember.Route.extend(CRUD, {

	actions: {
		saveExpense: function(record){
			this.saveRecord(record, null);
		}
	},

	model: function(params){
		return this.get('store').find('release', params.release_id);
	},

	setupController: function(controller, model){
		controller.setProperties({
			model:      model,
			newExpense: this.newExpense(model)
		});
	},

	newExpense: function(release){
		return this.get('store').createRecord('expense', {
			cost:        null,
			description: null,
			release:     release
		});
	},

	saveRecordSuccess: function(record, route){
		var release = this.get('controller.model');
		release.get('expenses').addObject(record);
		this.set('controller.newExpense', this.newExpense(release));
	},

	saveRecordError: function(errors, record, route){
		this._super(errors, record, route);
		record.set('release', this.get('controller.model'))
	}

});


