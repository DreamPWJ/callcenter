angular.module('starter.services', [])
//service在使用this指针，而factory直接返回一个对象
  .service('CommonService', function ($ionicPopup, $ionicPopover, $rootScope, $ionicPlatform, $state, $ionicHistory, $timeout, $ionicViewSwitcher, $ionicModal) {
    return {
      platformPrompt: function (msg, stateurl, stateparams) {
        CommonService = this;
        $rootScope.commonService = CommonService;
        $rootScope.commonService.toolTip(msg, "tool-tip-message-success");
        if (stateurl == null || stateurl == '') {
          $ionicHistory.goBack();
        } else if (stateurl == 'close') {//不处理
        } else {
          $state.go(stateurl, stateparams, {reload: true});
        }
      },
      showAlert: function (title, template, stateurl, stateparams) {
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
            $state.go(stateurl, stateparams, {reload: true});
          }

        });
      },
      showConfirm: function (title, template, okText, cancelText, stateurl, closeurl, confirmfunction, stateparams, stateparams2) {
        var confirmPopup = $ionicPopup.confirm({
          cssClass: "show-confirm",
          title: '<strong>' + title + '</strong>',
          template: template,
          okText: okText,
          cancelText: cancelText,
          okType: 'button-energized',
          cancelType: 'button-stable'
        });

        confirmPopup.then(function (res) {
          if (res) {
            if (stateurl != '') {
              $state.go(stateurl, stateparams, {reload: true});
              $ionicViewSwitcher.nextDirection("forward");//前进画效果
            } else {
              confirmfunction();
            }

          } else {
            if (closeurl == 'close') {//不处理
              return;
            }
            $state.go((closeurl == null || closeurl == '') ? 'tab.main' : closeurl, stateparams2, {reload: true})
            $ionicViewSwitcher.nextDirection("back");//后退动画效果
          }
        });
      },
      customModal: function ($scope, templateurl, index, animation) { //自定义modal ndex页面出现多个模态框的情况 进行命名区别 index 可以为1.2.3.   animation动画slide-in-left slide-in-right
        index = index == undefined ? "" : index;
        $ionicModal.fromTemplateUrl(templateurl, {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope["modal" + index] = modal;
        });
        $scope.openModal = function () {
          $scope["modal" + index].show();
        };
        $scope.closeModal = function () {
          $scope["modal" + index].hide();
        };
        //当我们用到模型时，清除它！
        $scope.$on('$destroy', function () {
          $scope["modal" + index].remove();
        });
        // 当隐藏的模型时执行动作
        $scope.$on('modal.hidden', function () {
          // 执行动作
          $scope.modalName = ''; //清除modal名
        });
        // 当移动模型时执行动作
        $scope.$on('modal.removed', function () {
          // 执行动作
        });
      }
      ,
      ionicPopover: function ($scope, templateUrl, index) {//页面出现多个Popover框的情况 进行命名区别 index 可以为1.2.3
        index = index == undefined ? "" : index;
        $ionicPopover.fromTemplateUrl('html/popover/' + templateUrl, {
          scope: $scope,
        }).then(function (popover) {
          $scope["popover" + index] = popover;
        });
        $scope.openPopover = function ($event) {
          $scope["popover" + index].show($event);
          //动态计算popover高度
          $rootScope.popoversize = document.querySelectorAll("#mypopover a").length * 55 + 'px';
        };
        $scope.closePopover = function () {
          $scope["popover" + index].hide();
        };
        //Cleanup the popover when we're done with it! 清除浮动框
        $scope.$on('$destroy', function () {
          $scope["popover" + index].remove();
        });
        $scope.$on('$ionicView.leave', function () {
          $scope["popover" + index].hide();
        });
        // 在隐藏浮动框后执行
        $scope.$on('popover' + index + '.hidden', function () {
          // Execute action
        });
        // 移除浮动框后执行
        $scope.$on('popover' + index + '.removed', function () {
          // Execute action
        });
      },
      toolTip: function (msg, type) { //全局tooltip提示
        this.message = msg;
        this.type = type;
        //提示框显示最多3秒消失
        var _self = this;
        $timeout(function () {
          _self.message = null;
          _self.type = null;
        }, 3000);
      },
      getQueryString: function (url, name) { // 通过key获取url中的参数值
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = url.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      goBack: function () { //h5原生APP返回
        if (ionic.Platform.is('ios')) {
          try {
            ios.goBack();
          } catch (e) {
            $ionicHistory.goBack();
          }
        } else {
          $ionicHistory.goBack();
        }
      }
    }

  })
  .service('MainService', function ($q, $http, CallCenter) { //首页服务定义
    return {
      getAdvList: function (params) { //获取轮播图
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
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
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
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
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
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
  .service('SigninService', function ($q, $http, CallCenter) { //签到服务
    return {
      getSignin: function (params) { //获取个人签到信息
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetSignin",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      setSignin: function (params) { //提交个人签到信息
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/SetSignin",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      getScoreRecord: function (params) { //获取签到记录
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetScoreRecord",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      getSigninHeadLines: function (params) { //获取签到头条
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetSigninHeadLines",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      getHFOrganAdList: function (params) { //返回广告列表
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetHFOrganAdList",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      signin: function (params) { //签到
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/Signin",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      getUserAutoSigninList: function (params) { //自动返回随机签到牌
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetUserAutoSigninList",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      setAutoSignin: function (params) { //提交翻牌子的信息
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/SetAutoSignin",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
    }
  })
  .service('CompareService', function ($q, $http, CallCenter, $ionicScrollDelegate, $ionicLoading) { //对比服务
    return {
      GetAllTrainClassList: function (params) { //根据机构获取对应全部班级信息
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetAllTrainClassList",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      getTrainDetailInfo: function (params) { //获取考霸代言的机构信息
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetTrainDetailInfo",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      getTopMasterClassList: function (params) { //获取班级对应的代言考霸列表信息
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/GetTopMasterClassList",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      setFollowExam: function (params) { //关注取消考试
        var deferred = $q.defer();// 声明延后执行，表示要去监控后面的执行
        var promise = deferred.promise
        promise = $http({
          method: 'GET',
          url: CallCenter.api + "/SetFollowExam",
          params: params
        }).success(function (data) {
          deferred.resolve(data);// 声明执行成功，即http请求数据成功，可以返回数据了
        }).error(function (data) {
          deferred.reject(data);// 声明执行失败，即服务器返回错误
        });
        return promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
      },
      selectCity: function ($scope) { //选择城市
        $ionicLoading.show({
          template: '<p><ion-spinner icon="spiral" class="spinner-light"></ion-spinner></p>',
          noBackdrop: true
        });
        //请求城市数据
        var d = "";
        $http({
          method: 'GET',
          url: CallCenter.api + "/GetAllTrainClassList",
          params: {
            praviteKey: 'oiox3tmqu1sn56x7occdd'
          },
          cache: true
        }).success(function (data) {
          console.log(data);
          d = data.Data;
        }).error(function (data, header, config, status) {

        }).then(function () {
          var newCities = []
          // 初始化城市索引
          var cities = []
          var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          chars.split('').forEach(function (c) {
            var c = {
              index: c,
              cities: [],
            }
            cities.push(c)
          }, this);

          cities.forEach(function (c) {
            d.forEach(function (city) {
              if (c.index == city.ItemIndex) {
                c.cities.push(city);
              }
            }, this)
          }, this);

          cities.forEach(function (c) {
            if (c.cities.length > 0) {
              newCities.push(c);
            }
          }, this);
          $ionicLoading.hide();
          //城市数据
          $scope.cities = newCities;
          //modal打开执行
          $scope.$on('modal.shown', function () {
            if ($scope.modalName == 'comparemodal') {
              function alphabetMove(pPositionY) {
                var currentItem, targetItem;
                var d = document;
                // 根据手指触摸的位置找到当前的element
                currentItem = d.elementFromPoint(d.body.clientWidth - 1, pPositionY);
                // 判断当前的element是不是 索引
                if (!currentItem || currentItem.className.indexOf('index-bar') < 0) return;

                // 根据当前的索引找到列表的索引
                targetItem = document.getElementById(currentItem.innerText);
                document.getElementById('indexs-title').style.display = 'block'
                document.getElementById('indexs-title').innerText = currentItem.innerText;

                $ionicScrollDelegate.$getByHandle('cityScroll').scrollBy(0, targetItem.getBoundingClientRect().top - 88, false)
              }

              //绑定事件
              var indexsBar = document.getElementById('indexs-bar');
              indexsBar.addEventListener('touchstart', function (e) {
                alphabetMove(e.changedTouches[0].clientY);
              });

              indexsBar.addEventListener('touchmove', function (e) {
                e.preventDefault();
                alphabetMove(e.changedTouches[0].clientY);
              });
              indexsBar.addEventListener('touchend', function () {
                document.getElementById('indexs-title').style.display = 'none';
              });
            }
          });

        })

      }
    }
  })
  .factory('MyInterceptor', function ($injector) {//设置请求头信息的地方是$httpProvider.interceptors。也就是为请求或响应注册一个拦截器。使用这种方式首先需要定义一个服务

    return {
      request: function (config) {////通过实现 request 方法拦截请求: 该方法会在 $http 发送请求道后台之前执行
        if (config.url.toString().indexOf('http://') === 0) {
          //http请求Loading加载动画
          $injector.get('$ionicLoading').show({
            template: '<p><ion-spinner icon="spiral" class="spinner-light"></ion-spinner></p>',
            noBackdrop: true
          });
          //授权
          config.headers = config.headers || {};
          var token = localStorage.getItem('token');
          if (token) {
            config.headers.authorization = token;
          }
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
          if (response.status == 401) {
            $injector.get('CommonService').platformPrompt("访问授权失败");
          } else if (response.status == 404) {
            $injector.get('CommonService').platformPrompt("访问连接404");
          } else if (response.status == -1) {
            $injector.get('CommonService').platformPrompt("网络请求超时");
          }
        }
        return response;
      }
    };
  })
