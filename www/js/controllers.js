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
  //申请售后服务
  .controller('AfterSaleCtrl', function ($scope, $stateParams, CommonService, DetailsService) {

  })
  //签到页面
  .controller('SignInCtrl', function ($scope, $stateParams, $ionicPopup, CommonService, SigninService) {
    $scope.getSignin = function () {
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
    }
    $scope.getSignin();
    //签到头条
    SigninService.getSigninHeadLines({
      praviteKey: 'oiox3tmqu1sn56x7occdd'
    }).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.signinHead = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
    // 返回广告列表
    SigninService.getHFOrganAdList({
      praviteKey: 'oiox3tmqu1sn56x7occdd'
    }).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.adList = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })

    //点击签到
    $scope.qianDao = function () {
      //签到
      SigninService.setSignin({
        userId: "48156",//用户id
        tokenInfo: "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
      }).success(function (data) {
        console.log(data);
        if (data.StatusCode == 0) {
          $scope.sign = data.Data;
          $scope.getSignin();
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
      // 自动返回随机签到牌
      SigninService.getUserAutoSigninList({
        praviteKey: 'oiox3tmqu1sn56x7occdd'
      }).success(function (data) {
        console.log(data);
        if (data.StatusCode == 0) {
          $scope.drawData = data.Data;
        } else {
          CommonService.platformPrompt(data.Msg, "close");
        }
      }).then(function () {
          window.setTimeout(function () {
              /*            $scope.drawData = [{
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
                          ];*/
              $scope.drawData[index].checked = true;
              $scope.$apply();
              // 提交翻牌子的信息
              SigninService.setAutoSignin({
                inputJson: {
                  AutoKey: $scope.drawData[index].key, // 接口135返回的牌子key值
                },
                userId: "48156",//用户id
                tokenInfo: "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
              }).success(function (data) {
                console.log(data);
                if (data.StatusCode == 0) {

                } else {
                  CommonService.platformPrompt(data.Msg, "close");
                }
              })
            }
            , 500)
        }
      )


    }

  })
  //签到详情
  .controller('ActivityDetailsCtrl', function ($scope, CommonService, SigninService) {

  })
  //比较页面
  .controller('CompareCtrl', function ($scope, $state, CommonService, CompareService) {
    $scope.compare = {
      isEdit: false,//是否编辑
    };
    //选择modal
    CommonService.customModal($scope, 'html/compare/comparemodal.html');

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
      $scope.ischecked = $scope.ischeckedarray.length == 2 ? true : false;
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
      var items = [];
      angular.forEach($scope.dataList, function (item) {
        if (item.checked) {
          items.push(item.ItemID)
        }
      })
      $state.go('comparedetails', {itemid1: items[0], itemid2: items[1]})
    }
  })
  //综合对比
  .controller('CompareDetailsCtrl', function ($scope, $stateParams, CommonService, CompareService) {

    // 获取比较的2个课程的详情
    CompareService.getTrainDetailInfo({
      inputJson: {
        "ItemID": $stateParams.itemid1, //接口138的班级ID，该值必须传入
        "ItemID2": $stateParams.itemid2, //接口138的培训ID，该值必须传入
      },
      praviteKey: 'oiox3tmqu1sn56x7occdd'
    }).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.detailInfo = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
    //获取班级对应的代言考霸列表信息
    CompareService.getTopMasterClassList({
      inputJson: {
        "TrainClassID": 1, //班级ID，必须传入，接口138返回
      },
      praviteKey: 'oiox3tmqu1sn56x7occdd'
    }).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.masterInfo = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
  })
  //参数对比
  .controller('ParametersDetailsCtrl', function ($scope, CommonService, CompareService) {

  })
