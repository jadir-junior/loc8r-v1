(function() {
  angular.module('loc8rApp').controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication', '$rootScope'];

  function navigationCtrl ($location, authentication, $rootScope) {
    var vm = this;

    vm.isDropdownCollapsed = true;

    vm.isCollapsed = function() {
      vm.isDropdownCollapsed = !vm.isDropdownCollapsed;
    };

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.updateAuthentication = function() {
      vm.isLoggedIn = authentication.isLoggedIn();
      vm.currentUser = authentication.currentUser();
    }


    $rootScope.$on('rootScope:login', function (event) {
      vm.updateAuthentication();
    });

    vm.logout = function() {
      authentication.logout();
      vm.isCollapsed();
      vm.updateAuthentication();
      $location.path('/');
    }
  }
})();
