(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");



function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundList',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var foundList = this;

  foundList.cookiesInList = function () {
    for (var i = 0; i < foundList.items.length; i++) {
      var name = foundList.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
}




//narrow down controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menuController = this;

  menuController.searchTerm = "";
  menuController.showNothingFoundMessage = false;
  menuController.message = "";
  menuController.foundItems = [];

  menuController.NarrowDown=function () {
    if(menuController.searchTerm == "")
    {
      menuController.message = "please enter search term.";
      menuController.showNothingFoundMessage = true;
      return;
    }

    menuController.foundItems = [];
    menuController.message = "please wait untill loading from server ...";
    var promise = MenuSearchService.getMatchedMenuItems(menuController.searchTerm);

    promise.then(function (foundItems) {
      if(foundItems.length == 0){
        menuController.message = "Nothing found";
        menuController.showNothingFoundMessage = true;
      }
      menuController.message = "";
      menuController.foundItems = foundItems;
    })
    .catch(function (error) {
      menuController.message = "ERROR! ERROR!, ";
      console.log(error);
    })
  };

  menuController.removeItem=function (itemIndex) {
    menuController.foundItems.splice(itemIndex, 1);
  }
}

//menu search service, call server, get response, filter result with search term.
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function (response) {
      var menuItems = response.data.menu_items;
      var foundItems= menuItems.filter(function (el) {
        return el.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });

      return foundItems;
    });

    return response;
  };
}

})();
