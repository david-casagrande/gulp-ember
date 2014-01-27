module.exports = function(grunt) {

	grunt.initConfig({

		concat_sourcemap: {
	    options: {
	    	sourcesContent: true
	    },
	    'tmp/dev/app.js': ["tmp/transpiled/**/*.js"]
	  }

	});

	grunt.loadNpmTasks('grunt-concat-sourcemap');
};

