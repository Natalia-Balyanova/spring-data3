angular.module('app', []).controller('indexController', function ($scope, $http) {
    const contextPath = 'http://localhost:8189/app';

     $scope.loadProducts = function () {
            $http.get(contextPath + '/products')
                .then(function (response) {
                    $scope.ProductsList = response.data;
                });
        }

        $scope.deleteProduct = function (productId) {
            $http.get(contextPath + '/products/delete/' + productId)
                .then(function (response) {
                    $scope.loadProducts();
                });
        }

        $scope.changePrice = function (productId, delta) {
            $http({
                url: contextPath + '/products/change_price',
                method: 'GET',
                params: {
                    productId: productId,
                    delta: delta
                }
            }).then(function (response) {
                $scope.loadProducts();
            });
        }

        $scope.createProductJson = function () {
            console.log($scope.newProductJson);
            $http.post(contextPath + '/products', $scope.newProductJson)
                           .then(function (response) {
                                $scope.loadProducts();
                           });
        }

        $scope.filterProducts = function() {
            console.log($scope.findProductBetween);
            $http({
                   url: contextPath + '/products/price_between',
                   method: 'get',
                   params: {
                       min: $scope.findProductBetween.min,
                       max: $scope.findProductBetween.max
                   }
                }).then(function (response) {
                        console.log(response.data);
                        $scope.ProductsList = response.data;
                        $scope.findProductBetween.min = null;
                        $scope.findProductBetween.max = null;
                });
        }

        //        $scope.loadPreviousPage = function (currentPage) {
        //                        $scope.loadProducts(currentPage - 1);
        //                    };
        //
        //        $scope.loadNextPage = function (currentPage) {
        //                $scope.loadProducts(currentPage + 1);
        //            };

        $scope.loadProducts();
});