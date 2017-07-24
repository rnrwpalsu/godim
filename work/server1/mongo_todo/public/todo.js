var myTodo = angular.module('myTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // todo 얻기
    $http.get('/todos').success(function(data) {
        $scope.todos = data;
    }).error(function(err) {
        console.log(err);
    });

    // todo 저장
    $scope.createTodo = function() {
        $http.post('/todos', $scope.formData).success(function(data) {
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        }).error(function(err) {
            console.log(err);
        });
    };
    // todo 삭제
    $scope.deleteTodo = function(id) {
        $http.delete('/todos/' + id).success(function(data) {
            console.log("delete data : ", data);
            $scope.todos = data;
        }).error(function(err) {
            console.log(err);
        });
    };
}