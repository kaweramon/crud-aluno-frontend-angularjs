angular.module('myApp.detalhe', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detalhe/:id', {
        templateUrl: 'detalhe/detalhe.html',
        controller: 'DetalheCtrl'
    });
}])

.controller('DetalheCtrl', ["$scope", "$http", 'Notification', 'Mensagens', '$routeParams', function($scope, $http, Notification,
                                                                                     Mensagens, $routeParams) {

    $scope.aluno = {};

    console.log("onInit");
    console.log($routeParams);
    $http({
        url: 'http://localhost:8080/alunos/' + $routeParams.id,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        $scope.aluno = response.data;
    }, function (response) {
        console.error(response);
    });




}]);