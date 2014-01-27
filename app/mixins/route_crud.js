export default Ember.Mixin.create({	

	saveRecord: function(record, route){
		var self = this;

		record.save()
		.then(function(){
			self.saveRecordSuccess(record, route);
		}, function(errors, record, route){
			console.log('heyy')
			self.saveRecordError(errors, record, route);
		});
	},

	saveRecordSuccess: function(record, route){
		if(route) {
			this.transitionTo(route, record);
		}
	},

	saveRecordError: function(errors, record, route){
		console.log('sup')
		alert(errors.message);
	},	

	deleteRecord: function(record, route){
		var self = this;

		record.deleteRecord();
		record.save()
		.then(function(){
			self.deleteRecordSuccess(record, route);
		}, function(errors){
			this.deleteRecordError(errors, record, route);
		});
	},

	deleteRecordSuccess: function(record, route){
		if(route) {
			this.transitionTo(route);
		}
	},

	deleteRecordError: function(errors, record, route){
		alert(errors.message);
	}

});
