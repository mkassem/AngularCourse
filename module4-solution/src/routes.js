(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'CategoriesController as categorieslist',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categoryItems', {
    url: '/category-items/{categoryId}',
    templateUrl: 'src/menuapp/templates/CategoryItems.template.html',
    controller: "CategoryItemsController as categoryItems",
    resolve: {
      categoryItems: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        
        return MenuDataService.getItemsForCategory($stateParams.categoryId);
      }]
    }
  });

}

})();
