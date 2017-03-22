(function (){
  'use strict';

  angular.module('ShoppingList', [])
  .controller('ToBuyController', ToBuyController)
  .controller('BoughtController', BoughtController)
  .service('ShoppingService', ShoppingService);

  ToBuyController.$inject = ['ShoppingService'];
  function ToBuyController(ShoppingService) {
    var thingsToBuy = this;
    thingsToBuy.items = ShoppingService.thingsToBuy;
    thingsToBuy.itemBought = function (index){
      ShoppingService.itemBought(index);
    }
    thingsToBuy.checkIfEmpty = function (){
     if (thingsToBuy.items.length === 0)
     return true;
   }
  }

  BoughtController.$inject = ['ShoppingService'];
  function BoughtController(ShoppingService){
    var thingsBought = this;
    thingsBought.items = ShoppingService.thingsBought;

    thingsBought.checkIfEmpty = function (){
      if (thingsBought.items.length === 0)
      return true;
    }
  }

  function ShoppingService(){
    var service = this;
    service.thingsToBuy= [
      {
        name: "Cookies",
        quantity: "12"
      },
      {
        name: "Chocolates",
        quantity: "12"
      },
      {
        name: "Candies",
        quantity: "12"
      },
      {
        name: "Bananas",
        quantity: "12"
      },
      {
        name: "Apples",
        quantity: "12"
      },
      {
        name: "Oranges",
        quantity: "12"
      }
    ];

    service.thingsBought = [];

    service.itemBought = function (index) {
      service.thingsBought.push(service.thingsToBuy[index]);
      service.thingsToBuy.splice(index, 1);
    };

  }
})();
