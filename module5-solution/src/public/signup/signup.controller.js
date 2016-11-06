(function () {
  "use strict"

  angular.module('common')
  .controller('SignupController', SignupController);

  SignupController.$inject = ["SignupSaveService", "MenuService", "$scope"];
  function SignupController(SignupSaveService, MenuService, $scope) {
    var signupCtrl = this;
    signupCtrl.user = {};

    //save sign up info into shared service.
    signupCtrl.submit = function () {
      //check if menu item id is valid
      var promise = MenuService.getMenuItem(signupCtrl.user.menuItemId);

      promise.then(function (response) {
        //set form validaty to true.
        $scope.signupForm.$setValidity("menuItemId", true, $scope.signupForm);
        signupCtrl.user.menuItem = response;
        //Save user info to sign up service.
        SignupSaveService.save(signupCtrl.user);
        signupCtrl.infoSaved = true;
      })
      .catch(function (error) {
        //set form validaty to false.
        $scope.signupForm.$setValidity("menuItemId", false, $scope.signupForm);
        $scope.signupForm.menuItemId.$error.serverMessage = 'No such menu number exists';
      });
    };

  }

})();
