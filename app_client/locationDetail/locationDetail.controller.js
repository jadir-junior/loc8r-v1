(function() {
  angular.module('loc8rApp').controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', 'loc8rData'];

  function locationDetailCtrl ($routeParams, loc8rData) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    loc8rData.locationById(vm.locationid)
      .then(function success(location) {
        vm.location = location.data;
        vm.pageHeader = {
          title: vm.location.name
        };
      }, function error(e) {
        console.log(e);
      });
  };
})();
