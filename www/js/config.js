/**
 * Created by pwj on 2017/1/23.
 * 系统接口常量配置
 */
var configMod = angular.module("starter.config", []);

configMod.constant("CallCenter", {
  'name': 'CallCenter', //项目名称
  'debug': false, //调试标示 暂无使用
  'api': 'http://www.51bmw.cn/WebServers/WebService.asmx',//接口服务地址  使用
  'version': '1.0.0' //当前版本号
});

