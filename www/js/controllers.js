angular.module('starter.controllers', [])
  .config(function ($httpProvider) { //统一配置设置
    //服务注册到$httpProvider.interceptors中  用于接口授权
    $httpProvider.interceptors.push('MyInterceptor');

  })

  //客服页面
  .controller('MainCtrl', function ($scope,CommonService, MainService) {
    MainService.getAdvList({PrivateKey: 'oiox3tmqu1sn56x7occdd'}).success(function (data) { //获取轮播去
      console.log(data);
      if(data.StatusCode==0){

      }else {
      //  CommonService.platformPrompt(data.Msg,"close");
      }
    })
  })

  //详情页面
  .controller('DetailsCtrl', function ($scope) {

  })

