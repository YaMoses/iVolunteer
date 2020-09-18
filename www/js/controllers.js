angular.module('starter.controllers', ['leaflet-directive', 'starter.controllers', 'starter.services', 'ngCordova'])



.controller('HomeCtrl', function($scope, $cordovaSQLite){

      $scope.external = new Date().getFullYear();
      $scope.external2 = new Date().getMonth();
      $scope.external3 = new Date().getDate();

      

})


.controller('CreateCtrl',function($scope,$state, $cordovaSQLite,  $ionicPopup){

     $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Add Entry',
     template: ['NAME:', $scope.name,'VOLUNTEER NAME:', $scope.vname, 'DATE:', $scope.dateOfEntry, 'LOCATION:', $scope.location, 'TIMESPENT:', $scope.timeSpent, 'STATUS:', $scope.status] 
   })

   confirmPopup.then(function(res) {
     if(res) {
       console.log('Agree');
        $scope.addInfo();
     } else {
       console.log('Cancel');
       $scope.form1.$setDirty();
     }
   })
  
 }
  
 
  $scope.addInfo=function(){
 
   //  $scope.showConfirm();
    var query = "INSERT INTO vol(name,vname,location,dateOfEntry,timeSpent,report,status) VALUES(?,?,?,?,?,?,?)";
    if (query != null) {
     
        $cordovaSQLite.execute(db,query,[$scope.name,$scope.vname,$scope.location,$scope.dateOfEntry,$scope.timeSpent,$scope.report,$scope.status]);
    }
  
    //$scope.showConfirm();
    console.log($scope.name,$scope.vname,$scope.location,$scope.dateOfEntry,$scope.timeSpent,$scope.report,$scope.status);
    
    $scope.form1.$setPristine();
    $scope.name = '';
    $scope.vname = '';
    $scope.location = '';
    $scope.dateOfEntry = '';
    $scope.timeSpent = '';
    $scope.report = '';
    $scope.status = '';
     
  }

})


.controller('EntriesCtrl',function($scope, $cordovaSQLite, $state,$ionicTabsDelegate, $ionicHistory, $cordovaSocialSharing){
      $scope.loadData=function(){
    $scope.alldata=[];
    $cordovaSQLite.execute(db,"SELECT * FROM vol").then(function(result){
      if(result.rows.length){
        for (var i = 0; i < result.rows.length; i++) {
          $scope.alldata.push(result.rows.item(i));

        } 
      }else{
        console.log("No data found!");
      }
    },function(error){
      console.log("error" +err);
    });
    
     $scope.whichEntries = $state.params.aId;
     //$scope.whcihUpdate  = $state.params.uId; 

     $scope.onItemDelete = function(item){
      $scope.alldata.splice($scope.alldata.indexOf(item), 1);
   }
  }

      $scope.checkTab = function(){
    var active = $ionicTabsDelegate.selectedIndex();
    if (active === 0){
      $scope.loadData();
    }
    else{
      $ionicTabsDelegate.select(0);
    }
  }

   $scope.myGoBack = function() {
    $ionicHistory.goBack();
  }
       
})


.controller('MapCtrl', function($scope, $http, LocationData , $state , $log){

      $scope.mapCenter = {
        lat: 14.058324,
        lng: 108.277199,
        zoom: 3
      }

     $http.get('data/data.json').success(function (data, status, headers, config){
          
          LocationData.initData(data);
          $scope.location = LocationData.getLocation();
     }).
     error(function (data, status, headers, config){
     	$log.info('error' + data);
     })

     var theLocationsData = LocationData.getLocations();
     var markerArray = [];

     for (var i = 0; i < theLocationsData.length; i++) {
     	var theLocationData = theLocationsData[i];
     	var locationMarker = {
     		lat: theLocationData.lat,
     		lng: theLocationData.lng,
     		icon: {
     			iconUrl: 'img/nps_arrowhead.png',
     			iconRetinaUrl: 'img/nps_arrowhead@2x.png',
     			iconSize: [32, 42],
     			iconAnchor: [16, 42]
     		},
     		location: theLocationData
     	};
     	markerArray.push(locMarker);
     }

     $scope.markers = markerArray;

 })     
