import ModalRoute from '../modal';

export default ModalRoute.extend({
	
	modalTemplate: 'artists.new',
	modalController: 'artists.new',
	modalCancelRoute: 'artists',

	model: function(){
		return this.get('store').createRecord('artist');
	}

});
