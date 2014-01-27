export default = DS.Model.extend({
	description: DS.attr('string'),
	name:        DS.attr('string'),
	releases:    DS.hasMany('release', { async: true })
});
