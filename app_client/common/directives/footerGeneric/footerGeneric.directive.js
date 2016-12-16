(function() {
  angular.module('loc8rApp').directive('footerGeneric', footerGeneric);

  function footerGeneric() {
    return {
      restric: "EA",
      templateUrl: '/common/directives/footerGeneric/footerGeneric.template.html'
    }
  }
})();
