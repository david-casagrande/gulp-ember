import Resolver from 'resolver';

export default Ember.Application.extend({
  LOG_ACTIVE_GENERATION:    true,
  LOG_MODULE_RESOLVER:      true,
  LOG_TRANSITIONS:          true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS:         true,
  modulePrefix:             'gulp', // TODO: loaded via config
  Resolver:                 Resolver['default']
});
