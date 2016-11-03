(function () {
  "use strict"

  angular.module('common')
  .service('SignupSaveService', SignupSaveService);

  function SignupSaveService() {
    var service = this;
    service.savedUser = null

    service.save = function (user) {
      service.savedUser = user;
    };

    service.get = function () {
      return service.savedUser;
    };
  }

})();
