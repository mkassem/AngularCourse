(function () {
  "use strict"

  angular.module('common')
  .controller('InfoController', InfoController);

  InfoController.$inject = ["SignupSaveService"];
  function InfoController(SignupSaveService) {
    var infoCtrl = this;
    infoCtrl.user = SignupSaveService.get();

    console.log("infoCtrl.user: "+infoCtrl.user);
    //save sign up info into shared service.
    infoCtrl.submit = function () {
      SignupSaveService.save(signupCtrl.user);
    };
  }

})();
