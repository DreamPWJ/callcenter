// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.config', 'starter.directive'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {


    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    /* 设置平台特性*/
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    //设置默认返回按钮的文字
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    // $ionicConfigProvider.views.maxCache(15);
    // $ionicConfigProvider.views.transition('platform');
    // $ionicConfigProvider.views.forwardCache(true); // 缓存下一页

    // false 默认所有的滚动使用native，会比js的滚动快很多，并且很平滑 ; 安卓使用,ios不使用
    $ionicConfigProvider.scrolling.jsScrolling(false);
    //Checkbox style. Android defaults to square and iOS defaults to circle
    $ionicConfigProvider.form.checkbox('circle');
    //Toggle item style. Android defaults to small and iOS defaults to large.
    $ionicConfigProvider.form.toggle('large');

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
      .state('signin', {//签到首页
        url: '/signin',
        templateUrl: 'html/signin/signin.html',
        controller: 'SignInCtrl'
      })
      .state('compare', {//对比首页
        url: '/compare',
        templateUrl: 'html/compare/compare.html',
        controller: 'CompareCtrl'
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('compare');
  })
