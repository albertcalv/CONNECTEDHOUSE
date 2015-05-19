'use strict';

var app = angular.module('connectedHouseApp',  ['mongolabResourceHttp','ngResource', 'ui.bootstrap', 'ngRoute']);


app.constant('MONGOLAB_CONFIG',{API_KEY:'2UkXrp3c_Kk9rJgB3PBfNL1zH2lg_xSd', DB_NAME:'ch-repo'});

app.factory('Devices', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('devices');
});

app.factory('Actions', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('actions');
});

app.factory('Status', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('status');
});


app.controller('PortadaCtrl', function ($scope, $http,$resource,$route,$window,$location ,Devices, Actions, Status) {

      $scope.mytime = new Date();
      $scope.hstep = 1;
      $scope.mstep = 1;
      $scope.toggle = true;
      //$http.get('http://localhost:9000/findAlldevices').
      $http.get('http://localhost:9000/findAlldevices').
        success(function(data, status, headers, config) {
          $scope.devices = data;
      }).error(function(data, status, headers, config) {
          alert('Error!');
      });

      $http.get('http://localhost:9000/findAllUsers').
        success(function(data, status, headers, config) {
          $scope.users = data;
      }).error(function(data, status, headers, config) {
          alert('Error!');
      });

      $http.get('http://localhost:9000/tasks').
        success(function(data, status, headers, config) {
          $scope.tasks = data;
      }).error(function(data, status, headers, config) {
          alert('Error!');
      });



      Devices.all().then(function(devices){
        $scope.devices_info = devices;
      });

      Actions.all().then(function(actions){
        $scope.actions_info = actions;
      });

      Status.all().then(function(status){
        $scope.status_info = status;
      });


/*
        $http.get('http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=perro')
        .success(function(data) {
            alert(data.ok);
        });

      $http.get('http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=perro').
            success(function(data, status, headers, config) {
                $scope.photos = data;
          }).error(function(data, status, headers, config) {
              alert('Error!');
          });
          alert($scope.photos);
*/

      $scope.newtask = function(deviceid,action,hour,minute){
        var time = hour + ":" + minute;
        if(time == "undefined:undefined") {
          time = "NOW";
        }



        $http.post('http://localhost:9000/newtask',
            {device_id: deviceid,action : action, date:time}
        ).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
          alert('Error!');
        });
	$window.location.reload();
      }

      $scope.newname = function(deviceid,devicename,device_id,address,status){

        var path = 'http://localhost:9000/changestatus' + deviceid;
        $http.put(path,
           { name: devicename,
             device_id : device_id,
             address: address,
             status:status
            }
        ).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
          alert('Error!');
        });
	$window.location.reload();
      }

      $scope.deletetask = function(task_id){
        var path = 'http://localhost:9000/deletetask' + task_id;
        $http.delete(path
        ).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
            alert('Error!');
          });
       $window.location.reload();
       // $location.path('http://localhost:9000/portada');
        //$route.reload();
	

      }
      

      $scope.newuser = function(user, password) {
        $http.post('http://localhost:9000/signup',
            {user: user,password : password}
        ).success(function(data, status, headers, config) {

        }).error(function(data, status, headers, config) {
          alert('Error!');
        });
	$window.location.reload();
      }

});
