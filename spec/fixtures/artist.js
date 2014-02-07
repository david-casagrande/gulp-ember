export default function(opts){
	opts = opts || {};
	return {
  	id:          opts.id ? opts.id : 1,
  	description: opts.description ? opts.description : 'Lorem ipsum',
  	name:        opts.name ? opts.name : 'Bam Spacey'
	};
}
