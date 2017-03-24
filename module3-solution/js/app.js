(function () {
  'use strict';

  angular.module('MenuChooseApp', [])
  .controller('MenuChooseController', MenuChooseController)
  .service('MenuChooseService', MenuChooseService)
  .constant('Path', "https://davids-restaurant.herokuapp.com")
  .factory('ListFactory', ListFactory)
  .directive('foundList', FoundList);

  function FoundList(){
    var ddo = {
      templateUrl: 'foundList.html',
      scope: {
        list: '=itemsList'
      }
    };
    return ddo;
  }

  MenuChooseController.$inject = ['MenuChooseService','ListFactory'];
  function MenuChooseController(MenuChooseService, ListFactory) {
    var list = this;

    var factoryList = ListFactory();
    list.items = factoryList.getItems();

    list.addItems = function () {
      try{
        var promise = MenuChooseService.getMenuChoose();
        promise.then(function (response) {
          factoryList.addItems(response, list.filterName );
        })
        .catch(function (error) {
          list.errorMessage = error.message;
        });
      }catch(error){
        list.errorMessage = error.message;
      }
    }
    list.removeItem = function (itemIndex) {
      factoryList.removeItem(itemIndex);
    };
  }

  MenuChooseService.$inject = ['$http', 'Path'];
  function MenuChooseService($http, Path) {
    var service = this;
    var items = [];
    service.getMenuChoose = function () {
      var response = $http({
        method: "GET",
        url: (Path + "/menu_items.json")
      });
      return response;
    };
  }

  function formatService(){
    var items = [];
    var service = this;

    service.addItems = function (response, filterName){
       items.length = 0;
        for(var i = 0; i < response.data.menu_items.length; i++){
          var item = {
            name: response.data.menu_items[i].name,
            description: response.data.menu_items[i].description,
            short_name: response.data.menu_items[i].short_name,
            description: response.data.menu_items[i].description
          };
          if(response.data.menu_items[i].name.indexOf(filterName)>0 ||
          response.data.menu_items[i].description.indexOf(filterName)>0 ){
            items.push(item);
          }
        }
        if(items.length === 0){
          throw new Error("Not found.");
        }
    }
    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    }
    service.getItems = function () {
      return items;
    };
  }
  function ListFactory() {
    var factory = function () {
      return new formatService();
    };
    return factory;
  }
})();
