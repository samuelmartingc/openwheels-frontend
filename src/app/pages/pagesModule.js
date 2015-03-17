'use strict';
angular.module('owm.pages', [
  'owm.pages.list-your-car',
  'owm.pages.list-your-car-login'
])

.config(function ($stateProvider) {

  $stateProvider

  .state('owm.pages', {
    views: {
      'navigation@': {
        templateUrl: 'navigation/navigation.tpl.html',
        controller: 'NavigationController'
      },
      'footer@': {
        templateUrl: 'footer/footer.tpl.html',
        controller: 'FooterController'
      }
    },
    resolve: {
      user: ['authService', function (authService) {
        return authService.userPromise();
      }]
    }
  })

  .state('list-your-car', {
    parent: 'owm.pages',
    url: '/auto-verhuren',
    views: {
      'main-full@': {
        templateUrl: 'pages/list-your-car/list-your-car.tpl.html',
        controller : 'ListYourCarController'
      }
    },
    data: {
      access: { feature: 'verhuurTussenscherm' }
    }
  })

  .state('list-your-car-login', {
    parent: 'owm.pages',
    url: '/auto-verhuren/deel-auto-aanmelden',
    views: {
      'main-full@': {
        templateUrl: 'pages/list-your-car/list-your-car-login.tpl.html',
        controller : 'ListYourCarLoginController'
      }
    },
    data: {
      access: { feature: 'verhuurTussenscherm' }
    }
  })
  ;

})
;
