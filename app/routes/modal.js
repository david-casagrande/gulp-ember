export default Ember.Route.extend({

	modalTemplate: null,
	modalController: null,
  modalCancelRoute: null,

	//modalReadyToTransition: false,

	renderTemplate: function() {
    this.render(this.get('modalTemplate'), {   // the template to render
      into: 'application',          // the template to render into
      outlet: 'modal',       // the name of the outlet in that template
      controller: this.get('modalController')  // the controller to use for the template
    });
    this.send('openModal');
  },

	actions: {
    willTransition: function(transition) {

    	this.send('closeModal');
    	return true;

    	//var self = this;
    	//if(!this.get('modalReadyToTransition')){
      	//transition.abort();
    	//}
    	//else {
				//self.set('modalReadyToTransition', false);
    		//return true;
    	//}

      //setTimeout(function(){
				//self.set('modalReadyToTransition', true);
      	//transition.retry();
      //}, 1000);

    }
  },

  beforeModel: function(){
    this.controllerFor('application').set('modalCancelRoute', this.get('modalCancelRoute'));
  }

});
