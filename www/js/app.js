// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.config', 'starter.directive', 'ngCordova'])

  .run(function ($ionicPlatform, $rootScope, $location, $ionicHistory, $cordovaToast) {
    $ionicPlatform.ready(function () {

      if (window.StatusBar) {
        //状态栏颜色设置
        // org.apache.cordova.statusbar required
        if ($ionicPlatform.is('ios')) {
          StatusBar.styleLightContent();
        }
        if ($ionicPlatform.is('android')) {
          StatusBar.backgroundColorByHexString("#f26604");
        }

      }

      //hide splash immediately 加载完成立刻隐藏启动画面
      if (navigator && navigator.splashscreen) {
        setTimeout(function () { //延迟显示 让页面先加载 不显示不美观的加载过程
          navigator.splashscreen.hide();
        }, 500);

      }

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      //主页面显示退出提示
      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();

        // Is there a page to go back to? 制定页面返回退出程序
        if ($location.path() == '/index') {
          if ($rootScope.backButtonPressedOnceToExit) {
            ionic.Platform.exitApp();
          } else {
            $rootScope.backButtonPressedOnceToExit = true;
            $cordovaToast.showShortCenter('再按返回退出51报名管家');
            setTimeout(function () {
              $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
          }

        } else if ($ionicHistory.backView()) {
          // Go back in history
          $ionicHistory.goBack();
        } else {
        }

        return false;
      }, 101);
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
      .state('index', {//客服首页
        url: '/index',
        templateUrl: 'html/index.html',
        controller: 'IndexCtrl'
      })
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
      .state('signindetails', {//签到详情
        url: '/signindetails',
        templateUrl: 'html/signin/signindetails.html',
        controller: 'SignInDetailsCtrl'
      })
      .state('compare', {//对比首页
        url: '/compare',
        templateUrl: 'html/compare/compare.html',
        controller: 'CompareCtrl'
      })
      .state('comparedetails', {//综合对比
        url: '/comparedetails',
        templateUrl: 'html/compare/comparedetails.html',
        controller: 'CompareDetailsCtrl'
      })
      .state('parametersdetails', {//参数对比
        url: '/parametersdetails',
        templateUrl: 'html/compare/parametersdetails.html',
        controller: 'ParametersDetailsCtrl'
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('index');
  })
