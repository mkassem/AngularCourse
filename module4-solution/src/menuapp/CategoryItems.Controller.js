(function () {
'use strict';

angular.module('data')
.controller('CategoryItemsController', CategoryItemsController);


CategoryItemsController.$inject = ['categoryItems'];
function CategoryItemsController(categoryItems) {
  var categoryItemlist = this;
  categoryItemlist.items = categoryItems;
}

})();
