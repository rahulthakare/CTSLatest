
var ctsapp = angular.module('ctsapp', ['ui.router', 'ngResource']);


ctsapp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

//$urlRouterProvider.otherwise("/");

	 $stateProvider
        .state('main', {
      url: "/main",
      templateUrl: "main.html"
     
    })
    .state('resource', {
      url: "/resource",
      templateUrl: "res.html"
     
    })
      .state('form', {
      url: "/form",
      templateUrl: "form.html"
     
    })

	
}])

ctsapp.factory('CustFactory', ['$resource', function($resource){
	return $resource('../json/custData.json');

}]);

ctsapp.controller('formCtrl', ['$scope', 'CustFactory', function($scope, CustFactory){

   console.log("App controller");
	$scope.msg = "test";
	$scope.dataSet = [];
	$scope.dataSet = CustFactory.get(function(){
		console.log(JSON.stringify($scope.dataSet.items));
		$scope.dataSet = $scope.dataSet.items;
	});
	
}])





