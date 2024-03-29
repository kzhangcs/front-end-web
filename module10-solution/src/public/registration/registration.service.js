(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);

RegistrationService.$inject = ['$http']
function RegistrationService($http) {
  var service = this;
  var completed = false;
  console.log("here in service");
  // List of shopping items
  var items = [];
  console.log("items", items)

  service.addItem = function (user) {
    console.log("here in addItem: user", user)
    console.log("here in addItem: user.menu", user.menu)
      const temp2 = user.menu.match(/\d+/);
      const temp2_index = user.menu.indexOf(temp2);
      const temp1 = user.menu.substring(0, temp2_index);
    user.temp1 = temp1;
    user.temp2 = temp2;
    console.log("here in addItem: temp1", temp1);
    console.log("here in addItem: temp2", temp2);

    const promise =  this.getAllCategories(temp1, temp2);
    console.log("here in addItem: promise", promise);

    promise.then(function (response) {
      console.log("here in promise, response", response);
      user.menu_saved = response;
    })
    .catch(function (error) {
    });
    console.log("here in addItem: user", user)
    items.push(user);
  };

  service.getAllCategories = function (temp1, temp2) {
    temp2 -= 1;
    return $http({
      method: "GET",
      url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + temp1 + "/menu_items/" + temp2 + ".json"),
    }).then(function (result) {
      return result.data;
  });
  };

  service.getItems = function () {
    console.log("here in getItems", items)
    return items?.[items.length - 1];
  };

  service.setCompleted = function() {
    completed = true;
  }

  service.setCompletedFalse = function() {
    completed = false;
  }


  service.getCompleted = function() {
    console.log("here in getCompleted", this.completed)
    return completed;
  }
}
})();