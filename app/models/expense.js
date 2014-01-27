export default = DS.Model.extend({
	cost:        DS.attr('number'),
	description: DS.attr('string'),
	release:     DS.belongsTo('release')
});