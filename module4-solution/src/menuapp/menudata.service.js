(function () {
'use strict';

angular.module('data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
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
      url: (ApiBasePath + "/menu_items.json"),
      data :{category : categoryShortName}
    });
    // .then(function (response) {
    //   var menuItems = response.data.menu_items;
    //   var foundItems= menuItems.filter(function (el) {
    //     return el.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    //   });
    //
    //   return foundItems;
    // });

    return response;
  };
}

})();
