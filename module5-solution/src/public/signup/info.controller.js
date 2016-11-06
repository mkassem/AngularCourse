(function () {
  "use strict"

  angular.module('common')
  .controller('InfoController', InfoController);

  InfoController.$inject = ["SignupSaveService"];
  function InfoController(SignupSaveService) {
    var infoCtrl = this;
    infoCtrl.user = SignupSaveService.get();
  }
})();
