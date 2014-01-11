module.exports = function(grunt) {
	
	var parseTemplateNamespace = function(filePath){
		var file = filePath.split('./app/templates/')[1],
				sansExt = file.split('.')[0];
    return sansExt;
	};

	grunt.initConfig({

		ember_handlebars: {
		  compile: {
		    options: {
		      namespace: "Ember.TEMPLATES",
					processName: function(filename) {
				    return parseTemplateNamespace(filename);
				  },
					processPartialName: function(filePath) {
				    return parseTemplateNamespace(filePath);
					}
		    },
		    files: {
		      "./dist/templates.js": ["./app/templates/**/*.handlebars", "./app/templates/partials/*.handlebars"]
		    }
		  }
		}

	});

	grunt.loadNpmTasks('grunt-ember-handlebars');
};

