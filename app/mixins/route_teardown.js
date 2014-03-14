export default Ember.Mixin.create({	

  deactivate: function(){
    this._super();
  	console.log('tear down');
  }

});
