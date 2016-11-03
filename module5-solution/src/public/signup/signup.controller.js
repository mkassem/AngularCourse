(function () {
  "use strict"

  angular.module('common')
  .controller('SignupController', SignupController);

  SignupController.$inject = ["SignupSaveService"];
  function SignupController(SignupSaveService) {
    var signupCtrl = this;
    signupCtrl.user = {};

    //save sign up info into shared service.
    signupCtrl.submit = function () {
      SignupSaveService.save(signupCtrl.user);
    };
  }

})();
