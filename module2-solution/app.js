(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller -- to buy list
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.boughtItem = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  }
}


// LIST #2 - controller -- Bought Items
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

//shopping list service, store two lists, one for to buy and the other one for bought items
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{name: "item 1", quantity: 10}
                  , {name: "item 2", quantity: 20}
                  , {name: "item 3", quantity: 30}
                  , {name: "item 4", quantity: 40}
                  , {name: "item 5", quantity: 50}
                  , {name: "item 6", quantity: 10}
                  , {name: "item 7", quantity: 20}
                  , {name: "item 8", quantity: 30}];
  var BoughtItems = [];

  service.boughtItem = function (itemIndex) {
      var item = toBuyItems[itemIndex]
      BoughtItems.push(item);

      removeItem(toBuyItems, itemIndex);
  };

  var removeItem = function (itemsArr, itemIndex) {
    itemsArr.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return BoughtItems;
  };
}

})();
