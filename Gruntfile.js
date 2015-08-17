module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-http-server');

  var fs = require('fs'),
          Book = require('gitbook').Book;

  grunt.registerMultiTask('gitbook', 'gitbook builder', function() {
      var config = this.data;
      var done = this.async();

      var exec = function() {
        var book = new Book(config.input, {'config': config,
            'logLevel': config.logLevel
        });

        return book.parse()
        .then(function() {
            return book.generate(config.format);
        })
        .then(function(){
            console.log("");
            console.log(color.green("Done, without error"));
        });
      }

      exec().then(done());

  });

  grunt.initConfig({
      'gitbook': {
          dzj: {
              input: "dzj/",
              output: "_html/dzj",
              title: "地藏经",
              description: "",
              github: "shanyou/jingsh",
              format: "website",
              logLevel: "info"
          },
          amtj: {
              input: "amtj/",
              output: "_html/amtj",
              title: "阿弥陀经",
              description: "",
              github: "shanyou/jingsh",
              format: "website",
              logLevel: "info"
          },
          jzdsy: {
              input: "jzdsy/",
              output: "_html/jzdsy",
              title: "觉者的生涯",
              description: "佛陀的故事",
              github: "shanyou/jingsh",
              format: "website",
              logLevel: "info"
          },
          wls: {
              input: "wls/",
              output: "_html/wls",
              title: "大乘无量寿庄严清净平等觉经",
              description: "净土大经",
              github: "shanyou/wls",
              format: "website",
              logLevel: "info"
          }
      },
      'gh-pages': {
          options: {
              base: '_html'
          },
          src: ['**']
      },  'clean': {
            files: '_html'
      },
      'http-server': {
          'dev': {
              // the server root directory
              root: '_html',

              port: 4000,
              host: "127.0.0.1",

              showDir : true,
              autoIndex: true,
              defaultExt: "html",

              //wait or not for the process to finish
              runInBackground: false
          }
      }
  });

  grunt.registerTask('test', [
      'gitbook:dzj',
      'gitbook:amtj',
      'gitbook:jzdsy',
      'gitbook:wls',
      'http-server'
  ]);

  grunt.registerTask('publish', [
      'gitbook',
      'gh-pages',
      'clean'
  ]);

  grunt.registerTask('default', 'gitbook');

};
