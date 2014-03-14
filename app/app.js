import Resolver from 'resolver';

export default Ember.Application.extend({
  LOG_ACTIVE_GENERATION:    false,
  LOG_MODULE_RESOLVER:      false,
  LOG_TRANSITIONS:          false,
  LOG_TRANSITIONS_INTERNAL: false,
  LOG_VIEW_LOOKUPS:         false,
  modulePrefix:             'gulp', // TODO: loaded via config
  Resolver:                 Resolver['default']
});
