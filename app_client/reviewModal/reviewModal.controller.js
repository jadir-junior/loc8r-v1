(function() {
  angular.module('loc8rApp').controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$uibModalInstance', 'locationData', 'loc8rData'];

  function reviewModalCtrl ($uibModalInstance, locationData, loc8rData) {
    var vm = this;
    vm.locationData = locationData;

    vm.modal = {
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      },
      close: function (result) {
        $uibModalInstance.close(result);
      }
    };

    vm.onSubmit = function () {
      vm.formError = "";
      if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);
      }
    };

    vm.doAddReview = function(locationid, formData) {
      loc8rData.addReviewById(locationid, {
        author: formData.name,
        rating: formData.rating,
        reviewText: formData.reviewText
      })
      .then(function success(review) {
        vm.modal.close(review);
      }, function error (e) {
        vm.formError = "Your review has not been saved try again";
      });
      return false;
    }
  };
})();
