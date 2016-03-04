angular.module('starter.controllers', [])


.controller('socket', function($scope, $rootScope,$ionicLoading) {



  var server = "192.168.0.16";
  var topics = {
    topic: 'sensor/action'
  };
  var wsUriC = "ws://" + server + ":1880/myApp";
  var ws;
  var object = {};

  $scope.detail = {};
  $scope.detail.list = [];

  $scope.detail.load = "waiting";
  $scope.announce = {
    status: "Closed"
  };
  $scope.output = [];
  var index = 0;


  $rootScope.lights = $rootScope.lights || 0;



  $scope.wsConnect = function() {
    console.log('running connect');
    $scope.detail.load = "connecting";
    $ionicLoading.show({
    template:'Connecting...<ion-spinner></ion-spinner>'
  })
    ws = new WebSocket(wsUriC);
    ws.onopen = function(event) {
      console.log('connection open ');
      $ionicLoading.hide();
      $scope.announce = "Connected";
      $scope.$apply();
      //                $scope.send("hello from the browser");
      $scope.lights = $rootScope.lights;

    }
    ws.onclose = function(event) {
      console.log('connection closed');
      //                setTimeout(wsConnect, 1000);
      $ionicLoading.hide();
      $scope.announce = "Disconnected";
      $scope.$apply();
    }

    ws.onmessage = function(msg) {

      console.log(msg.data);
      //                if(event.data =='0' || event.data =='9'){console.log('lights changing');}
      //                var output = JSON.parse(event.data);
      //                console.log(output);
      //                index =0;
      //                if(output.sensor=="temp"){index =1};
      //
      //                $scope.detail.list[index]= output;
      //                console.log(output.value);
      //                
      //                $scope.detail.load=(output);
      //                $scope.$apply();
    };
  };

  $scope.send = function(sensor, status) {

    object['sensor'] = sensor;
    object['value'] = status;
   $scope.lights = status;
    console.log(object);
    //            console.log(JSON.stringify(object));
    ws.send(JSON.stringify(object));
  };

  $scope.wsClose = function() {
    $ionicLoading.show({
    template:'Disconnecting...<ion-spinner></ion-spinner>'
  });
    $scope.announce.status = "Closing";
    ws.close();
  };

  $scope.wsConnect();

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});