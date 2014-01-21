define("gulp/controllers/test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ObjectController.extend({
    	
    	foo: true,

    	toggleFoo: function(){
    		var currentFoo = this.get('foo');
    		this.set('foo', !currentFoo);
    	}

    });
  });