define("gulp/routes/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
    	model: function(){
    		return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    	}
    });
  });