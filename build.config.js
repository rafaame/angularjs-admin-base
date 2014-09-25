/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'httpdocs',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],

    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
        'vendor/jquery/dist/jquery.js',
        'vendor/angular/angular.js',
        'vendor/angular-route/angular-route.min.js',
        'vendor/angular-cookies/angular-cookies.min.js',
        'vendor/angular-animate/angular-animate.min.js',
        'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'vendor/angular-ui-router/release/angular-ui-router.js',
        'vendor/angular-ui-utils/modules/route/route.js',
        'vendor/jquery-spinner/dist/jquery.spinner.min.js',
        'vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
        'vendor/jquery-steps/build/jquery.steps.min.js',
        'vendor/toastr/toastr.min.js',
        'vendor/bootstrap-file-input/bootstrap.file-input.js',
        'vendor/jquery.slimscroll/jquery.slimscroll.min.js',
        'vendor/raphael/raphael-min.js',
        'vendor/morris.js/morris.js',
        'vendor/scripts/vendors/responsive-tables.js',
        'vendor/scripts/vendors/jquery.sparkline.min.js',
        'vendor/flot/jquery.flot.js',
        'vendor/flot/jquery.flot.resize.js',
        'vendor/flot/jquery.flot.pie.js',
        'vendor/flot/jquery.flot.stack.js',
        'vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
        'vendor/flot/jquery.flot.time.js',
        'vendor/gauge.js/dist/gauge.min.js',
        'vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js',
        'vendor/angular-wizard/dist/angular-wizard.min.js',
        'vendor/textAngular/dist/textAngular-sanitize.min.js',
        'vendor/textAngular/dist/textAngular.min.js',
        'vendor/scripts/vendors/skycons.js',
        'vendor/angular-ui-tree/dist/angular-ui-tree.min.js',
        'vendor/angularjs-google-maps/dist/ng-map.min.js',
        'vendor/jqvmap/jqvmap/jquery.vmap.min.js',
        'vendor/jqvmap/jqvmap/maps/jquery.vmap.world.js',
        'vendor/jqvmap/jqvmap/maps/jquery.vmap.usa.js',
        'vendor/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
        'vendor/ng-tags-input/ng-tags-input.min.js',
        'vendor/intro.js/minified/intro.min.js',
        'vendor/angular-intro.js/build/angular-intro.min.js'
    ],
    css: [
    ],
    assets: [
    	'vendor/font-awesome/css/font-awesome.min.css',
    	'vendor/font-awesome/fonts/*',

    	'vendor/weather-icons/css/weather-icons.min.css',
    	'vendor/weather-icons/font/*'
    ]
  },
};
