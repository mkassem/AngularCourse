(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.eatForLunch = "";
  $scope.statusMessage = "";
  $scope.emptyClass = "";

  $scope.checkIfTooMuch = function () {
    //check for empty
    if($scope.eatForLunch === "")
    {
      $scope.statusMessage = "Please enter data first";
      $scope.emptyClass = "empty";
      return
    }
    //change text and border color
    $scope.emptyClass = "not-empty";
    var itemArr = $scope.eatForLunch.split(',');

    //remove empty strings from items array
    itemArr = itemArr.filter(function(v){return trim(v)!==''});
    if(itemArr.length <= 3)
    {
      $scope.statusMessage = "Enjoy!";
    }
    else {
      $scope.statusMessage = "Too much!";
    }
  };

  //function to trim a string from begining and end
  function trim (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }
}

})();
