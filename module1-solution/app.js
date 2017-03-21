(function () {
  'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);
  LunchCheckController.$inject = ['$scope', '$filter'];

  function LunchCheckController($scope, $filter){
    var enterData = "Please enter data first",
        enjoy = "Enjoy!!!",
        tooMuch = "Too much!!!";

    $scope.CheckTooMuch = function(){
      var text = $scope.text;
      if(typeof text !== 'undefined' && text !== null && text !== ""){
        text = text.split(",");
        if(text.length < 3 && text.length > 0){
         $scope.message = enjoy;
        }else {
         $scope.message = tooMuch;
        }
      }else {
          $scope.message = enterData;
      }
    }
  }
})();
