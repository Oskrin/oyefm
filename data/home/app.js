// create the controller and inject Angular's $scope
angular.module('scotchApp').controller('mainController', function ($scope, $route, $interval) {
	
	$interval(callAtInterval, 3000);
	$scope.count = "0";

	function callAtInterval() {
	$.ajax({
            type: "POST",
            url: "data/home/app.php",
            data: {count_conectados:'count_conectados'},
            dataType: 'json',
            async: false,
            success: function(data) {
            	$scope.count = data.count;
            }
        });

        $.ajax({
            type: "POST",
            url: "data/home/app.php",
            data: {usuario_conectados:'usuario_conectados'},
            dataType: 'json',
            async: false,
            success: function(data) {
            	$scope.datos = data;
            }
        });
	}
});
