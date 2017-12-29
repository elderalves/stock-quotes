var gulp        = require("gulp"),
    browserify  = require("browserify"),
    source      = require("vinyl-source-stream"),
    buffer      = require("vinyl-buffer"),
    tslint      = require("gulp-tslint"),
    tsc         = require("gulp-typescript"),
    karma       = require("karma").server,
    coveralls   = require("gulp-coveralls"),
    uglify      = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    header      = require("gulp-header"),
    browserSync = require("browser-sync"),
    reload      = browserSync.reload,
    pkg         = require(__dirname + "/package.json"),
    typescript = require("typescript");

var tsProject = tsc.createProject({
  removeComments : false,
  noImplicitAny: false,
  target: "es5",
  module: "commonjs",
  declarationFiles : false,
  experimentalDecorators: true
});

var tsTestProject = tsc.createProject({
  target: "es5",
  noImplicitAny: false,
  module: "commonjs",
  experimentalDecorators: true,
});

gulp.task("lint", function(){
  return gulp.src([
    "source/**/**.ts",
    "test/**/**.test.ts"
  ])
  .pipe(tslint({
    formatter: "verbose"
  }))
  .pipe(tslint.report());
});

gulp.task("build-source", function(){
  return gulp.src(__dirname + "/source/**/**.ts")
             .pipe(tsProject())
             .js.pipe(gulp.dest(__dirname + "/build/source/"));
});

gulp.task("build-test", function(){
  return gulp.src(__dirname + "/test/**/*.test.ts")
             .pipe(tsTestProject())
             .js.pipe(gulp.dest(__dirname + "/build/test/"));
});

gulp.task("bundle-source", function(){
  var b = browserify({
    standalone : "TsStock",
    entries: __dirname + "/build/source/app/main.js",
    debug: true,
  });

  return b.bundle()
          .pipe(source("bundle.js"))
          .pipe(buffer())
          .pipe(gulp.dest(__dirname + "/bundled/source/"));
});

gulp.task("bundle-test", function(){
  var b = browserify({
    standalone: "test",
    entries: __dirname + "/build/test/bdd.test.js",
    debug: true
  });

  return b.bundle()
          .pipe("bdd.test.js")
          .pipe(buffer())
          .pipe(gulp.dest(__dirname + "/bundled/test/"));
});

gulp.task("karma", function(cb) {
  karma.start({
    configFile: "karma.config.js",
    singleRun: true
  }, cb);
});

gulp.task("cover", function() {
  return gulp.src(__dirname + '/coverage/**/lcov.info')
      .pipe(coveralls());
});

gulp.task('run-e2e-test', function(){
  return gulp.src('')
             .pipe(nightwatch({
               configFile: 'nightwatch.json'
             }));
});

gulp.task("compress", function(){
  return gulp.src("bundled/source/bundle.js")
             .pipe(uglify({ preserveComments: false }))
             .pipe(gulp.dest("dist/"))
});

gulp.task("header", function(){
  var pkg = require("package.json");

  var banner = [
    "/**", 
    " * <%= pkg.name %> v.<%= pkg.version %> - <%= pkg.description %>", 
    " * Copyright (c) 2018 <%= pkg.author %>",
    " * <%= pkg.license %>",
    " * <%= pkg.homepage &>",
    " */",
    ""
  ].join("\n");

  return gulp.src("dist/bundle.js")
             .pipe(header(banner, {pkg: pkg}))
             .pipe(gulp.dest("dist/"));
});


//******************************************************************************
//* SERVE
//******************************************************************************
gulp.task("serve", function(cb) {
  browserSync({
      port: 8080,
      server: {
          baseDir: __dirname + "/"
      }
  });

  gulp.watch([
    __dirname + "/node_modules/**/*.css",
    __dirname + "/node_modules/**/*.js",
    __dirname + "/source/**/*.ts",
    __dirname + "/test/**/*.ts",
    __dirname + "/css/**/*.css",
    __dirname + "/img/**/*.css",
    __dirname + "/index.html"
  ], browserSync.reload, cb);
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
runSequence(
  "lint",
  "build-source",
  "build-test",
  "bundle-source",
  "bundle-test",
  "karma",
  "cover",
  "compress",
  "header",
  cb);
});





