(function () {
'use strict';

angular.module('data')
.component('categoryList', {
  templateUrl: 'src/menuapp/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
