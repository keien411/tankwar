/**
 * Created by c1720 on 2017/10/5.
 */

var app = require('app');

var TankManager = app.BaseClass.extend({

    Init:function(){
        this.JS_Name = "TankManager";

        this.InitConfig();

        cc.log("TankManager Init");
    },

    //切换账号
    OnReload:function(){

    },

    /**
     * 初始化配置
     */
    InitConfig:function(){

        //通用属性初始化字典
        this.tankPositionDict = {
            "position":cc.v2(-48,192)
        };
    },



    //--------------------------获取接口----------------------------------
    /**
     * 配置位置值
     * @param position
     */
    SetTankPosition:function(position){
        if (!!position){
            this.tankPositionDict.position = position;
        }
    },



    //--------------------------获取接口----------------------------------
    /**
     * 设置获取值
     * @param option
     */
    GetTankPosition:function(){
        if(!!this.tankPositionDict.position){
            return this.tankPositionDict.position;
        }
        return cc.v2(-48,192);
    },

});


var g_TankManager = null;

/**
 * 绑定模块外部方法
 */
exports.GetModel = function(){
    if(!g_TankManager){
        g_TankManager = new TankManager();
    }
    return g_TankManager;
}
