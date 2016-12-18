(function() {
  angular.module('loc8rApp').directive('navigation', navigation);

  function navigation() {
    return {
      restric: 'AE',
      templateUrl: '/common/directives/navigation/navigation.template.html',
      controller: 'navigationCtrl as navvm'
    }
  }
})();
