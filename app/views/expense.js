export default = Ember.View.extend({
	
	tagName: 'tr',
	
	actions: {
		deleteExpense: function(expense){
			var self = this;
			this.$().fadeOut(600, function(){
				self.deleteRecord(expense);
			});
		}
	},

	deleteRecord: function(expense){
		var self    = this;
		
		expense.deleteRecord();
		expense.save().then(function(){
			self.get('controller.expenses').removeObject(expense);
		});

	}

});
