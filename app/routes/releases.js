export default = Ember.Route.extend({
	/*
	actions: {

		saveRelease: function(record){
			this.saveRecord(record, 'releases.show');
		},
		
		deleteRelease: function(release){
			this.deleteRecord(release, 'releases.index');
		},

		deleteExpense: function(record){
			this.deleteRecord(record, 'releases.show');
		}	
	
	},
	*/
	model: function(){
		return this.get('store').find('release');
	},
/*
	setupController: function(controller, model){
		this._super();	
	}
*/
});