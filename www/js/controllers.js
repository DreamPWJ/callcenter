angular.module('starter.controllers', [])
  .config(function ($httpProvider) { //统一配置设置
    //服务注册到$httpProvider.interceptors中  用于接口授权
    $httpProvider.interceptors.push('MyInterceptor');

  })

  //客服页面
  .controller('MainCtrl', function ($scope, CommonService, MainService, $timeout, $ionicSlideBoxDelegate) {
    //获取轮播去
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
  .controller('DetailsCtrl', function ($scope,$stateParams, CommonService, DetailsService) {
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

