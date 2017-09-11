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

    //h5原生APP返回
    $scope.goBack = function () {
      CommonService.goBack()
    }
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
    var userId = CommonService.getQueryString(window.location, "userId");
    var tokenInfo = CommonService.getQueryString(window.location, "tokenInfo");
    $scope.getSignin = function () {
      //获取签到记录
      SigninService.getSignin({
        userId: userId || "48156",//用户id
        tokenInfo: tokenInfo || "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
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
        userId: userId || "48156",//用户id
        tokenInfo: tokenInfo || "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
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
                userId: userId || "48156",//用户id
                tokenInfo: tokenInfo || "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
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
    //h5原生APP返回
    $scope.goBack = function () {
      CommonService.goBack()
    }
  })
  //签到详情
  .controller('ActivityDetailsCtrl', function ($scope, $stateParams, CommonService, SigninService) {
    $scope.content = $stateParams.content;
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
    //h5原生APP返回
    $scope.goBack = function () {
      CommonService.goBack()
    }
  })
  //综合对比
  .controller('CompareDetailsCtrl', function ($scope, $stateParams, $state, CommonService, CompareService) {
    var userId = CommonService.getQueryString(window.location, "userId");
    var tokenInfo = CommonService.getQueryString(window.location, "tokenInfo");
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
    //获取班级对应的代言考霸列表信息1
    CompareService.getTopMasterClassList({
      inputJson: {
        "TrainClassID": $stateParams.itemid1, //班级ID，必须传入，接口138返回
      },
      praviteKey: 'oiox3tmqu1sn56x7occdd'
    }).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.masterInfo1 = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
    //获取班级对应的代言考霸列表信息2
    CompareService.getTopMasterClassList({
      inputJson: {
        "TrainClassID": $stateParams.itemid2, //班级ID，必须传入，接口138返回
      },
      praviteKey: 'oiox3tmqu1sn56x7occdd'
    }).success(function (data) {
      console.log(data);
      if (data.StatusCode == 0) {
        $scope.masterInfo2 = data.Data;
      } else {
        CommonService.platformPrompt(data.Msg, "close");
      }
    })
    //关注
    $scope.attentio = function (MasterId) {
      // 关注取消考试
      CompareService.setFollowExam({
        inputJson: {
          "NoticeType": 4, //公告类型，1表示考试，2表示活动，3表示培训，4表示考霸关注，5表示考霸代言机构， 如果不传该参数系统默认是考试类型关注
          "ExamTypeId": 0, //考试类型ID号，当类型是1或者无的时候必传
          "ActiveId": 0, //表示活动ID，类型是 2的时候必传
          "TrainTypeId": 0,  //表示培训类型ID，类型是3的时候必传
          "MasterId": MasterId,  //考霸ID，类型4的时候必传
          "OrganID": 0,  //机构ID，类型5的时候必传
          "IsFollow": 1  //0表示取消关注或取消代言，1表示开启关注或者代言
        },
        userId: userId || "48156",//用户id
        tokenInfo: tokenInfo || "5fb0ad26-cc07-4bf5-9671-2811e1f09034" //用户token
      }).success(function (data) {
        console.log(data);
        if (data.StatusCode == 0) {
          CommonService.platformPrompt("关注考霸成功", "close");
        } else {
          CommonService.platformPrompt(data.Msg, "close");
        }
      })
    }
    //详情参数
    $scope.parametersdetails = function () {
      $state.go("parametersdetails", {item: JSON.stringify($scope.detailInfo)})
    }
  })
  //参数对比
  .controller('ParametersDetailsCtrl', function ($scope, $stateParams, CommonService, CompareService) {
    $scope.detailInfo = JSON.parse($stateParams.item);
  })
