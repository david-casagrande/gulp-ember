var initializer = {
  name: 'load fixtures',
  after: 'store',
  initialize: function(container, application) {
    var store = container.lookup('store:main');

    Ember.keys(requirejs._eak_seen).filter(function(key) {
      return !!key.match(/^gulp\/models\//) && DS.Model.detect(require(key));
    }).map(function(key){
      var type = require(key);
      var typeKey = key.match(/^gulp\/models\/(.*)/)[1];
      if (type.FIXTURES) {
        store.pushMany(typeKey, type.FIXTURES);
      }
    });
  }
};

export default initializer;
