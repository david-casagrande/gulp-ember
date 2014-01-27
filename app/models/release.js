export default = DS.Model.extend({
	artist:          DS.belongsTo('artist'),
	catalogueNumber: DS.attr('string'),
	expenses:        DS.hasMany('expense', { async: true }),
	name:            DS.attr('string')
});
