module.exports = function (grunt) {
	grunt.initConfig({
		env: {
			dev: {
				NODE_ENV: 'development'
			},
			test: {
				NODE_ENV: 'test'
			}
		},
		nodemon: {
			dev: {
				script: 'server/app.js',
				options: {
					ext: 'js, html',
					watch: ['server/**/*.js', 'server/**/**/*.js', 'client/app/*.js', 'client/app/**/*.js']
				}
			},
			debug: {
				script: 'server/app.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js, html',
					watch: ['server/**/*.js', 'server/**/**/*.js', 'client/app/*.js', 'client/app/**/*.js']					
				}				
			}
		},
		mochaTest: {
			src: 'server/api/tests/*.js',
			options: {
				reporter: 'spec'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		protractor: {
			e2e: {
				options: {
					configFile: 'protractor.conf.js'
				}
			}
		},
		jshint: {
			all:{
				src: ['server/app.js', 'server/**/*.js', 'server/**/**/*.js', 'client/app/*.js', 'client/app/**/*.js']
			}
		},
		csslint: {
			all: {
				src: 'client/components/css/*.css'
			}
		},
		watch: {
			js: {
				files: ['server/app.js', 'server/**/*.js', 'server/**/**/*.js', 'client/app/*.js', 'client/app/**/*.js'],
				tasks: ['jshint']
			},
			css: {
				files: 'client/components/css/*.css',
				tasks: ['csslint']
			}
		},
		concurrent: {
			dev: {
				tasks: ['nodemon', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			},
			debug: {
				tasks: ['nodemon:debug', 'watch', 'node-inspector'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		'node-inspector': {
			debug: {}
		}
	});

	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-node-inspector');



	grunt.registerTask('default', ['env:dev', 'lint', 'concurrent:dev']);
	grunt.registerTask('debug', ['env:dev', 'lint', 'concurrent:debug']);
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma', 'protractor']);
	grunt.registerTask('lint', ['jshint', 'csslint']);
};