const path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            js: {
                basePath: '',
                srcPath: './public/javascripts/src/',
                deployPath: './public/javascripts/min/'
            },
            css: {
                basePath: '',
                srcPath: './public/stylesheets/less/css/',
                deployPath: './public/stylesheets/less/css/'
            },
            img: {
                basePath: '',
                srcPath: './public/images/',
                deployPath: './public/images/'
            }
        },
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ',
        //编译 less文件
        less: {
            server: {
                options: {
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.css.srcPath %>less/',
                    src: ['**/*.less'],
                    dest: '<%= meta.css.deployPath %>less/',
                    ext: '.css'
                }]
            }
        },
        //编译js文件 ES6语法
        babel:{
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.js.srcPath %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.js.deployPath %>',
                    ext: '.js'
                }]
            }
        },
        //js语法检查
        jshint:{
            all:['<%= meta.js.srcPath %>common/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        //合并 js/css
        concat: {
            // js: {
            //     files: [{
            //         src: ['<%= meta.js.srcPath %>/web/*.js'],
            //         dest: '<%= meta.js.srcPath %>/web/bundle.js'
            //     }]
            // },
            css: {
                files: [ {
                    src: ['<%= meta.css.srcPath %>less/index.css', '<%= meta.css.srcPath %>less/common.css',],
                    dest: '<%= meta.css.srcPath %>src/style.css'
                }]
            }
        },
        //压缩CSS 代码
        cssmin: {
            css: {
                expand: true,
                cwd: '<%= meta.css.deployPath %>min/',
                src: ['**/*.css', '!*.min.css'],
                dest: '<%= meta.css.deployPath %>min/',
                ext: '.min.css'
            }
        },
        //图片压缩
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: '<%= meta.img.srcPath %>',
                    src: ['**/*.{png,jpg,jpeg,gif}'], // 优化目录下所有 png/jpg/jpeg 图片
                    dest: '<%= meta.img.deployPath %>' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },
        //编译 css 添加兼容前缀
        postcss: {
            options:{
                processors:[
                    require('autoprefixer')(),
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.css.srcPath %>src/',
                    src: ['style.css'],
                    dest: '<%= meta.css.deployPath %>min/',
                    ext: '.css',
                }]
            }
        },
        //压缩 混淆 JS
        uglify: {
            options: {
                banner: '\n'
            },
            bulid: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.js.deployPath %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.js.deployPath %>',
                    ext: '.min.js',
                    extDot: 'first'
                }, {
                    expand: true,
                    cwd: './js/',
                    src: ['common.js'],
                    dest: './js/',
                    ext: '.min.js',
                    extDot: 'first'
                }
                // {
                //     expand: true,
                //     cwd: '<%= meta.js.deployPath %>/web/',
                //     src: ['bundle.js'],
                //     dest: '<%= meta.js.deployPath %>/web/',
                //     ext: '.min.js',
                //     extDot: 'first'
                // },
                // {
                //     expand: true,
                //     cwd: '<%= meta.js.deployPath %>/server/',
                //     src: ['**/*.js'],
                //     dest: '<%= meta.js.deployPath %>/server/',
                //     ext: '.min.js',
                //     extDot: 'first'
                // }
                ]
            }
        },
        //热更新
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: ''
            },
            server: {
              options: {
                port: 9001,
                base: './'
              },
            },
          },
        
        watch: {
            js: {
                files: [
                    '<%= meta.js.srcPath %>/**/*.js'
                ],
                // tasks: ['concat:js', 'uglify']
                tasks: ['babel','uglify']
            },
            style: {
                files: [
                    '<%= meta.css.srcPath %>/less/*.less'
                ],
                tasks: ['less', 'concat:css', 'postcss', 'cssmin']
            },
            image: {
                files: [
                    '<%= meta.img.srcPath %>/**/*.{png,jpg,jpeg,gif}'
                ],
                tasks: ['imagemin']
            },

            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'index.html',
                    '<%= meta.css.deployPath %>style.min.css',
                    '<%= meta.js.deployPath %>**/*.js',
                    '<%= meta.img.deployPath %>**/*.{png,jpg,jpeg,gif}',
                ]
            }
        },
        clean: ['<%= meta.js.deployPath %>/**/*.js', '<%= meta.js.deployPath %>/**/*.js.map', 
                '<%= meta.css.srcPath %>/min/style.css', '<%= meta.css.srcPath %>/min/style.min.css']
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');

    //压缩图片
    grunt.registerTask('imgmin',['imagemin']);
    //编译 less 添加兼容前缀， 压缩css
    grunt.registerTask('stylemin',['less', 'concat', 'postcss', 'cssmin']);
    //编译 JS ES6
    grunt.registerTask('jsmin',['concat', 'babel', 'uglify']);
    grunt.registerTask('cl',['clean']);
    //监测 
    grunt.registerTask('watchit',['clean', 'less', 'concat', 'babel', 'postcss', 'cssmin', 'uglify', "connect", 'watch']);
    grunt.registerTask('default',['clean', 'less', 'concat', 'babel',  'postcss', 'cssmin', 'uglify']);
    
};