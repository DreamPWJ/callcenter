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
  .controller('SignInCtrl', function ($scope, $stateParams, $ionicPopup, CommonService, SigninService) {
    //获取签到记录
    SigninService.getSignin({
      userId: "48156",//用户id
      tokenInfo: "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
    }).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.signinInfo = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
    //点击签到
    $scope.qianDao = function () {
      //获取签到记录
      SigninService.signin({
        inputJson: {
          "SignTypeId": "1",	//签到类型ID,0就返回当前最新积分，1表示每日签到，2表示参加模拟答题。现在后台系统默认签到+5，参加答题+10
        },
        userId: "48156",//用户id
        tokenInfo: "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
      }).success(function (data) {
        console.log(data);
        if (data.StatusCode == 0) {
          /*          $scope.signinInfo = data.Data;*/
        } else {
          CommonService.platformPrompt(data.Msg, "close");
        }
      })

      $scope.drawData = [{
        key: 'a', value: "翻牌", icon: "", img: "img/logo.png"
      },
        {key: 'b', value: "翻牌", icon: "", img: "img/logo.png"},
        {
          key: 'c', value: "翻牌", icon: "", img: "img/logo.png"
        }, {
          key: 'd', value: "翻牌", icon: "", img: "img/logo.png"
        }, {
          key: 'e', value: "翻牌", icon: "", img: "img/logo.png"
        }, {
          key: 'f', value: "翻牌", icon: "", img: "img/logo.png"
        }
      ];
      // 一个提示对话框
      var alertPopup = $ionicPopup.alert({
        cssClass: "show-alert",
        templateUrl: "html/signin/signalert.html",
        scope: $scope,
        okText: '关闭',
        okType: 'button-stable'
      });
      alertPopup.then(function (res) {
        $scope.isChecded = false;
      });
    }

    $scope.checkChecded = function (index) {
      if ($scope.isChecded) return;
      $scope.isChecded = true;
      window.setTimeout(function () {
          $scope.drawData = [{
            key: 'a', value: "积分2个", icon: "icon-favorfill", img: ""
          },
            {key: 'b', value: "谢谢参与", icon: "icon-emoji", img: ""},
            {
              key: 'c', value: "积分1个", icon: "icon-favorfill", img: ""
            }, {
              key: 'd', value: "新东方￥50", icon: "icon-moneybagfill", img: ""
            }, {
              key: 'e', value: "积分5个", icon: "icon-favorfill", img: ""
            }, {
              key: 'f', value: "新东方￥60", icon: "icon-moneybagfill", img: ""
            }
          ];
          $scope.drawData[index].checked = true;
          $scope.$apply();
        }
        , 500)

    }

  })
  //签到详情
  .controller('SignInDetailsCtrl', function ($scope, CommonService, SigninService) {

  })
  //比较页面
  .controller('CompareCtrl', function ($scope, $state, CommonService, CompareService) {
    $scope.compare = {
      isEdit: false,//是否编辑
    };
    //选择modal
    CommonService.customModal($scope, 'html/compare/comparemodal.html');

    //根据机构获取对应全部班级信息
/*    CompareService.getALLOrganCourseList({
      inputJson: {
        "OrganID":"1" //培训机构ID，来自接口117返回
      },
      userId: "48156",//用户id
      tokenInfo: "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
    }).success(function (data) {
      console.log(data);
      console.log(data);
      if (data.StatusCode == 0) {
        /!*          $scope.signinInfo = data.Data;*!/
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })*/
    //modal 加载数据
    $scope.$on('$ionicView.afterEnter', function () {
      CompareService.selectCity($scope);
    })

    //点击选择
    $scope.openCustomModal = function () {
      $scope.modalName = 'comparemodal';
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
      $scope.ischeckedarray = [];
      angular.forEach(array, function (item) {
        if (item.checked) {
          $scope.ischeckedarray.push(true);
        }
      });
      $scope.ischecked = $scope.ischeckedarray.length >= 2 ? true : false;
    }
    //编辑
    $scope.edit = function () {
      $scope.compare.isEdit = true;
    }
    //编辑全部
    $scope.editAll = function () {
      $scope.ischeckedarray = [];
      angular.forEach($scope.dataList, function (item) {
        item.checked = true;
        $scope.ischeckedarray.push(true);
      });
    }
    //编辑取消
    $scope.editCancel = function () {
      $scope.compare.isEdit = false;
    }
    //删除比较
    $scope.deleteCompare = function () {
      var len = $scope.dataList.length - 1;
      for (var i = len; i >= 0; i--) {
        $scope.dataList.splice(i, 1);
      }
      if ($scope.dataList.length == 0) {
        $scope.compare.isEdit = false;
      }
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
