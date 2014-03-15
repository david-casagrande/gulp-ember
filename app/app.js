import Resolver from 'resolver';
import FixturesInitializer from './initializers/load_fixtures';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION:    false,
  LOG_MODULE_RESOLVER:      true,
  LOG_TRANSITIONS:          false,
  LOG_TRANSITIONS_INTERNAL: false,
  LOG_VIEW_LOOKUPS:         false,
  modulePrefix:             'gulp', // TODO: loaded via config
  Resolver:                 Resolver['default']
});

Ember.Application.initializer(FixturesInitializer);

export default App;
