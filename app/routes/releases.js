import CRUD from 'gulp/mixins/route_crud';

export default Ember.Route.extend(CRUD, {
	
	actions: {

		saveRelease: function(record){
			this.saveRecord(record, 'releases.show');
		},
		
		deleteRelease: function(release){
			this.deleteRecord(release, 'releases.index');
		},

		saveExpense: function(){
			var record = this.get('controller.newExpense');
			
			var cb = function(){
				console.log(record)
			};

			this.saveRecord(record, null, cb());
		},

		deleteExpense: function(record){
			this.deleteRecord(record, 'releases.show');
		}	
	
	},
	
	model: function(){
		return this.get('store').find('release');
	},

	setupController: function(controller, model){
		controller.setProperties({
			model:      model,
			newExpense: this.newExpense()
		});
	},

	newExpense: function(){
		console.log(this.get('store'));
		var record = this.get('store').createRecord('expense', {
			cost:        null,
			description: null
		});
		console.log(record)
		return record;
	}

});
