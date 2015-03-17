'use strict';

angular.module( 'owm.auth', [
  'owm.auth.signup',
  'owm.auth.forgotPassword',
  'owm.auth.resetPassword'
])

.config(function config($stateProvider) {

  $stateProvider

  .state('signup', {
    parent: 'base',
    url: '/signup?preference',
    views: {
      'main@':{
        templateUrl: 'auth/signup/auth-signup.tpl.html',
        controller: 'AuthSignupController'
      }
    },
    data: {
      access: { deny: { authenticated: true } }
    },
    resolve: {
      prevState: ['$state', function ($state) {
        // console.log($state);
      }]
    }
  })

  .state('owm.auth', {
    abstract: true
  })

  .state('owm.auth.forgotPassword', {
    url: '/forgot-password',
    views: {
      'main@': {
        templateUrl: 'auth/forgotPassword/forgotPassword.tpl.html',
        controller : 'ForgotPasswordController'
      }
    }
  })

  .state('owm.auth.resetPassword', {
    url: '/reset-password/:code',
    views: {
      'main@': {
        templateUrl: 'auth/resetPassword/resetPassword.tpl.html',
        controller : 'ResetPasswordController'
      }
    }
  })

  .state('owm.auth.validateEmail', {
    url: '/email/:personId/validate/:code',
    onEnter: ['$state', '$stateParams', '$timeout', '$translate', 'alertService', 'personService',
    function ( $state ,  $stateParams ,  $timeout ,  $translate ,  alertService ,  personService) {

      var personId = $stateParams.personId;
      var code     = $stateParams.code;

      alertService.load();
      personService.validateEmail({
        person: personId,
        hash  : code
      })
      .then(function () {
        alertService.add('success', $translate.instant('AUTH_EMAIL_VALIDATE_SUCCESS'), 8000);
      })
      .catch(function (err) {
        alertService.addError(err);
      })
      .finally(function () {
        alertService.loaded();
        $timeout(function () {
          $state.go('home');
        });
      });
    }]
  })
  ;

})
;
