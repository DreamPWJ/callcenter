// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers','starter.services','starter.config'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    //产品列表
    $stateProvider
      .state('main', {//客服首页
        url: '/main',
        templateUrl: 'html/main.html',
        controller: 'MainCtrl'
      })
      .state('details', {//客服首页
        url: '/details/:type/:id',
        templateUrl: 'html/details.html',
        controller: 'DetailsCtrl'
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('main');
  })
