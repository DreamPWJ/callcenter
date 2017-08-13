angular.module('starter.controllers', [])
  .config(function ($httpProvider) { //统一配置设置
    //服务注册到$httpProvider.interceptors中  用于接口授权
    $httpProvider.interceptors.push('MyInterceptor');

  })
  //APP主页面
  .controller('IndexCtrl', function ($scope, CommonService) {

  })
  //客服页面
  .controller('MainCtrl', function ($scope, CommonService, MainService, $timeout, $ionicSlideBoxDelegate) {
    //获取轮播图片
    MainService.getAdvList({praviteKey: 'oiox3tmqu1sn56x7occdd'}).success(function (data) {
      if (data.StatusCode == 0) {
        $scope.banner = data.Data;
        //ng-repeat遍历生成一个个slide块的时候，执行完成页面是空白的 手动在渲染之后更新一下，在控制器注入$ionicSlideBoxDelegate，然后渲染数据之后
        $timeout(function () {
          $ionicSlideBoxDelegate.$getByHandle("slide-box-images").update();
          //上面这句就是实现无限循环的关键，绑定了滑动框，
          $ionicSlideBoxDelegate.$getByHandle("slide-box-images").loop(true);
          /*            console.log($ionicSlideBoxDelegate.$getByHandle("slide-box-images").slidesCount());*/
        }, 100)
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
    //获取帮助页面的接口列表
    MainService.gtHeadHelpInfoList({praviteKey: 'oiox3tmqu1sn56x7occdd'}).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.helpInfoList = data.Data;

      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
  })

  //详情页面
  .controller('DetailsCtrl', function ($scope, $stateParams, CommonService, DetailsService) {
    //{    "HelpType":0 //帮助类型ID ，不能为空 ，类型ID固定是3个值，1表示是管家使用指南，2表示是报名进度中心，其他情况全部给0"AutoHelpID":1 //帮助内容表单 id，来源于接口105，只有当helptype是0的时候才需要传入}
    //获取帮助信息详情接口
    DetailsService.getHelpInfoDetails({
      inputJson: {
        HelpType: $stateParams.type,
        AutoHelpID: $stateParams.id
      },
      praviteKey: 'oiox3tmqu1sn56x7occdd'
    }).success(function (data) {  //获取帮助信息详情接口
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.helpInfoDetails = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })

  })
  //签到页面
  .controller('SignInCtrl', function ($scope, $ionicPopup, CommonService) {
    //点击签到
    $scope.qianDao = function () {
      // 一个提示对话框
      var alertPopup = $ionicPopup.alert({
        cssClass: "show-alert",
        templateUrl: "html/signin/signalert.html",
        okText: '关闭',
        okType: 'button-stable'
      });

    }

    $scope.checkChecded = function () {
      /*      CommonService.checkChecded($scope, $scope.services)*/
    }
  })
  //比较页面
  .controller('CompareCtrl', function ($scope, $state, CommonService, CompareService) {
    //选择modal
    CommonService.customModal($scope, 'html/compare/comparemodal.html');

    //modal打开 加载数据
/*    $scope.$on('modal.shown', function () {
      if ($scope.modalName == 'comparemodal') {*/
        CompareService.selectCity($scope);
/*      }
    })*/

    //点击选择
    $scope.openCustomModal = function () {
      /*  $scope.modalName = 'comparemodal';*/
      $scope.modal.show();

    }
    //选择对比
    $scope.dataList = [];
    $scope.citySelected = function (data) {
      $scope.dataList.push(data);
      $scope.modal.hide();
    }

    //检测选中个数

    $scope.checkChecded = function (array) {
      $scope.ischecked = false;
      var ischeckedarray = [];
      angular.forEach(array, function (item) {
        if (item.checked) {
          ischeckedarray.push(true);
        }
      });
      $scope.ischecked = ischeckedarray.length >= 2 ? true : false;
    }

    //开始对比
    $scope.compare = function () {
      $state.go('comparedetails')
    }
  })
  //综合对比
  .controller('CompareDetailsCtrl', function ($scope, CommonService, CompareService) {

  })
  //参数对比
  .controller('ParametersDetailsCtrl', function ($scope, CommonService, CompareService) {

  })
