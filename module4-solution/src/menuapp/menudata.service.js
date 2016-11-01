(function () {
'use strict';

angular.module('data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);

// MenuDataService.$inject = ['$q', '$timeout']
// function MenuDataService($q, $timeout) {
MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;



  // List of shopping items
  var items = [];

  // Pre-populate a no cookie list
  items.push({
    name: "Sugar",
    quantity: "2 bags",
    description: "Sugar used for baking delicious umm... baked goods."
  });
  items.push({
    name: "flour",
    quantity: "1 bags",
    description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
  });
  items.push({
    name: "Chocolate Chips",
    quantity: "3 bags",
    description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
  });

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {

    // var deferred = $q.defer();
    //
    //     // Wait 2 seconds before returning
    //     $timeout(function () {
    //       // deferred.reject(items);
    //       deferred.resolve(items);
    //     }, 800);
    //
    //     return deferred.promise;

    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    })
    .then(function (response) {
      var categories = response.data;
      return categories;
    });

    return response;
  };

  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category="+categoryShortName),
    })
    .then(function (response) {
      var items = response.data.menu_items;
      return items;
    });

    return response;
  };
}

})();
