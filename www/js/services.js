angular.module('starter.services', [])


.factory('LocationData', function($log){
	$log.info('Location data created');
	var theLocationData = [];

	return {
		initData: function (theData) {
			theLocationData = theData;
			return null;
		},
		getLocations: function () {
			return theLocationData;
		},
		getLocation: function (locationID) {
			for (var i = 0; i < theLocationData.length; i++) {
                  if (theLocationData[i].id == parseInt(locationID)) {
                  	return theLocationData[i];
                  }

				}
				return null;
     }
 };
});