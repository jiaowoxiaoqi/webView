// var deployType='dev';

var enviroment = process.env.NODE_ENV == 'production' ? 'PRD' : 'DEV'
// enviroment = 'PRD'
enviroment = 'DEV'
//console.log("enviroment->" + enviroment)

var appVersion = {
code: 66,
name: '1.0.0'
}

// var deployType='product';
var configuration = {
'DEV': {
    uriGateway: "http://ag.dev.c.smarteventcloud.cn",
    uriMigratedApi: "http://eventxapi.dev.c.smarteventcloud.cn",
    uriSignalR: 'http://signalr.sites.dev.smarteventcloud.cn',
    uriSmartAlipay: "http://alipay.apis.dev.smarteventcloud.cn",
    uriSupport: 'http://m.smarteventcloud.cn/supportallergan/',
    hospital: 'http://mshopapi.dev.c.smarteventcloud.cn',
    tenantId: '71d19d5b-208b-45ff-b118-4cb88bade4c4',
    ApiKey: 'd6c85b271958e53d2dd5bfee',
    SecretKey: 'fd85e434f1f925cc0c978a0e',
    upiOSJsonFile: 'iosVersion-dev.json',
    upAndroidJsonFile: 'androidVersion-dev.json',
    appChannel: 'EventX',
    appLoginMode: 'F',
    appVersion: appVersion.name,
    appVersionCode: appVersion.code,
    applicationId: 'f7c49684-1604-4014-94dc-36466b9ba2c0'
},
'PRD': {
    uriGateway: "http://ag.container.smarteventcloud.cn",
    uriMigratedApi: "http://eventxapi.container.smarteventcloud.cn",
    uriSignalR: 'http://signalr.smarteventcloud.cn',
    uriSmartAlipay: "http://xsmartalipay.smarteventcloud.cn",
    hospital: 'http://mshop.container.smarteventcloud.cn',
    tenantId: '71d19d5b-208b-45ff-b118-4cb88bade4c4',
    ApiKey: 'd6c85b271958e53d2dd5bfee',
    SecretKey: 'fd85e434f1f925cc0c978a0e',
    upiOSJsonFile: 'iosVersion.json',
    upAndroidJsonFile: 'androidVersion.json',
    //appChannel: 'EventX',
    appChannel: 'EventX',
    appLoginMode: 'F',
    appVersion: appVersion.name,
    appVersionCode: appVersion.code,
    applicationId: 'f7c49684-1604-4014-94dc-36466b9ba2c0'
}
}[enviroment]
export default configuration