var Artist = DS.Model.extend({
	description: DS.attr('string'),
	name:        DS.attr('string')
});

Artist.FIXTURES = [
  { id: 1, description: 'A real chill Swedish bro', name: 'Bam Spacey', releases: [1] },
  { id: 2, description: 'A real chill Oakland bro', name: 'Dan Casey', releases: [2] }
];

export default Artist;
