App.Artist.reopen({
	releases: DS.hasMany('release')
});

App.Artist.FIXTURES = [
  { id: 1, description: 'A real chill Swedish bro', name: 'Bam Spacey', releases: [1] },
  { id: 2, description: 'A real chill Oakland bro', name: 'Dan Casey', releases: [2] }
];
