/*
    客户端公共require模块
*/

let BaseClass = require('BaseClass');

//不需要创建单例的API
let apiDict = {
    "BaseClass":BaseClass,
}


module.exports = apiDict;



//需要创建单例的API
let NeedCreateList = [

    "LocalDataManager",

];


module.exports.NeedCreateList = NeedCreateList;