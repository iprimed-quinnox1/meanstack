app.controller('myCtrl', function($scope, hexafy) {
	$scope.hex = 111;
  $scope.hex = hexafy.myFunc(255);
});
