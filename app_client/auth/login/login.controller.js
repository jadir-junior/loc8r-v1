(function() {
  angular.module('loc8rApp').controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication', '$rootScope'];

  function loginCtrl($location, authentication, $rootScope) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Loc8r'
    };

    vm.credentials = {
      email: "",
      password: ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function() {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
          .then(function success() {
            $rootScope.$emit('rootScope:login', 'Login!');
            $location.search('page', null);
            $location.path(vm.returnPage);
          }, function error(err) {
            vm.formError = err;
          });
    };
  }
})();
