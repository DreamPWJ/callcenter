// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.config', 'starter.directive'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {


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
