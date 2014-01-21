define("gulp/app", 
  ["resolver","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];

    var App = Ember.Application.extend({
      //LOG_ACTIVE_GENERATION:    true,
      //LOG_MODULE_RESOLVER:      true,
      //LOG_TRANSITIONS:          true,
      //LOG_TRANSITIONS_INTERNAL: true,
      //LOG_VIEW_LOOKUPS:         true,
      modulePrefix:             'gulp', // TODO: loaded via config
      Resolver:                 Resolver['default']
    });

    console.log('so good and it kind of points correctly');

    __exports__["default"] = App;
  });