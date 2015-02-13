var app = angular.module("helloNG", ["ngRoute", "ngAnimate"]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
        controller: "customersController",
        templateUrl: "app/views/customers.html"
    })
    .when('/orders/:customerId', {
        controller: "OrdersController",
        templateUrl: "app/views/orders.html"
    });
});

app.controller('customersController', function($scope, customersFactory){
    customersFactory.getCustomers().success(function(data){
        $scope.customers = data;
    });    
});

app.controller('OrdersController', function($scope, $routeParams, OrdersFactory){
    $scope.customerIdFilter = $routeParams.customerId;
    
    OrdersFactory.getOrders().success(function(data){
        $scope.orders = data;
    });
    
});

app.factory('customersFactory', function($http){
    var factory = {};

    factory.getCustomers = function () {
        return $http.get("customers.json");
    };

    return factory;
});

app.factory('OrdersFactory', function($http){
    var factory = {};

    factory.getOrders = function () {
        return $http.get("orders.json");
    };

    return factory;
});
