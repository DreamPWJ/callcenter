angular.module('starter.services', [])
//service在使用this指针，而factory直接返回一个对象
  .service('CommonService', function ($ionicPopup, $ionicPopover, $rootScope, $state) {
    return {
      platformPrompt: function (msg, stateurl) {
        this.showAlert("51报名管家", msg, stateurl);
      },
      showAlert: function (title, template, stateurl) {
        // 一个提示对话框
        var alertPopup = $ionicPopup.alert({
          cssClass: "show-alert",
          title: title,
          template: template,
          okText: '确定',
          okType: 'button-energized'
        });
        alertPopup.then(function (res) {
          if (stateurl == null || stateurl == '') {
            $ionicHistory.goBack();
          } else if (stateurl == 'close') {//不处理

          } else {
            $state.go(stateurl, {}, {reload: true});
          }

        });
      }
    }
  })
  .service('MainService', function ($q, $http, CallCenter) { //首页服务定义
    return {
      getAdvList: function (params) { //获取轮播图
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise;
        params.callback='JSON_CALLBACK';
        promise = $http({
          method: 'JSONP',
          url: CallCenter.api + "/GetTopBanner",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      gtHeadHelpInfoList: function (params) { //获取帮助页面的接口列表
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise;
        params.callback='JSON_CALLBACK';
        promise = $http({
          method: 'JSONP',
          url: CallCenter.api + "/GetHeadHelpInfoList",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      }
    }
  })
  .service('DetailsService', function ($q, $http, CallCenter) { //帮助详情服务
    return {
      getHelpInfoDetails: function (params) { //获取帮助信息详情接口
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise;
        params.callback='JSON_CALLBACK';
        promise = $http({
          method: 'JSONP',
          url: CallCenter.api + "/GetHelpInfoDetails",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      }
    }
  })

  .factory('MyInterceptor', function ($injector) {//设置请求头信息的地方是$httpProvider.interceptors。也就是为请求或响应注册一个拦截器。使用这种方式首先需要定义一个服务

    return {
      request: function (config) {////通过实现 request 方法拦截请求: 该方法会在 $http 发送请求道后台之前执行
        if (config.url.toString().indexOf('http://') === 0) {
          //http请求Loading加载动画
          $injector.get('$ionicLoading').show({
            template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner><p>',
            animation: 'fade-in',
            showBackdrop: false
          });
        }
        //授权
        config.headers = config.headers || {};
        var token = localStorage.getItem('token');
        if (token) {
          config.headers.authorization = token;
        }
        return config;
      },
      requestError: function (config) {//通过实现 requestError 方法拦截请求异常: 请求发送失败或者被拦截器拒绝
        if (config.url.toString().indexOf('http://') === 0) {
          $injector.get('$ionicLoading').hide();
        }
        return config;
      },
      response: function (response) {//通过实现 response 方法拦截响应: 该方法会在 $http 接收到从后台过来的响应之后执行
        if (response.config.url.toString().indexOf('http://') === 0) {
          $injector.get('$ionicLoading').hide();
        }
        return response;
      },
      responseError: function (response) {////通过实现 responseError 方法拦截响应异常:后台调用失败 响应异常拦截器可以帮助我们恢复后台调用
        if (response.config.url.toString().indexOf('http://') === 0) {
          $injector.get('$ionicLoading').hide();
        }
        return response;
      }
    };
  })
