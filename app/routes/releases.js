import CRUD from 'gulp/mixins/route_crud';

export default Ember.Route.extend(CRUD, {
	
	actions: {

		saveRelease: function(record){
			this.saveRecord(record, 'releases.show');
		},
		
		deleteRelease: function(release){
			this.deleteRecord(release, 'releases.index');
		}
	
	},
	
	model: function(){
		return this.get('store').find('release');
	}

});
