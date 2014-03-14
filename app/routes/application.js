export default Ember.Route.extend({

	model: function(){
		return Em.Object.create({});
	},

  actions: {
  
    openModal: function() {
    	this.checkForModal();
    },

    closeModal: function() {
    	this.hideModal();
    },

    transitionFromModal: function(){
      if(this.get('controller.modalCancelRoute')){
        this.transitionTo(this.get('controller.modalCancelRoute'));
      }
    }
  },

  checkForModal: function(){
    var self = this,
    		modalReady = this.get('controller.modalReady');

  	if(modalReady){
  		this.showModal();
  	}
  	else {
  		setTimeout(function(){
  			self.checkForModal();
  		}, 50);
  	}
  },

  showModal: function(){
  	$('#modal').addClass('show');
  	$('#modal-bg').addClass('show');
  },

  hideModal: function(){
  	$('#modal').removeClass('show');
  	$('#modal-bg').removeClass('show');
/*
  	$('#modal').removeClass('show').addClass('animating');
  	$('#modal-bg').removeClass('show').addClass('animating');
  	setTimeout(function(){
	  	$('#modal').removeClass('animating');
	  	$('#modal-bg').removeClass('animating');  		
  	}, 1000);
*/
  }

});
