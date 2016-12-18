(function() {
  angular.module('loc8rApp').controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', 'loc8rData', '$uibModal', '$location', 'authentication'];

  function locationDetailCtrl ($routeParams, loc8rData, $uibModal, $location, authentication) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentPath = $location.path();

    loc8rData.locationById(vm.locationid)
      .then(function success(location) {
        vm.location = location.data;
        vm.pageHeader = {
          title: vm.location.name
        };
      }, function error(e) {
        console.log(e);
      });

    vm.popupReviewForm = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve: {
          locationData: function() {
            return {
              locationid: vm.locationid,
              locationName: vm.location.name
            };
          }
        }
      });

      modalInstance.result.then(function (data) {
        vm.location.reviews.push(data.data);
      });
    };
  };
})();
