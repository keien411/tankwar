/*
    本地数据库管理器
*/
var app = require('app');

var LocalDataManager = app.BaseClass.extend({

    Init:function(){
        this.JS_Name = "LocalDataManager";

        //暂时只有一个区
        this.linkServer = "Server01";

	    //通用属性初始化字典
	    this.InitDataDict = {
							    "SysSetting":{
											    "nowLevel":1,
                                    			"choeseLevel":1,
												"guankadengji":0,
										    },
						    };

	    //玩家个人属性初始化字典
	    this.PlayerInitData = {

						    };

        this.InitConfig();

        cc.log("LocalDataManager Init");
    },

    //切换账号
    OnReload:function(){

    },

    /**
     * 初始化配置
     */
    InitConfig:function(){

	    for(var configName in this.InitDataDict){
		    var optionData = this.InitDataDict[configName];
		    for(var option in optionData){
			    if (this.HaveConfigProperty(configName, option)){
				    continue
			    }
			    this.SetConfigProperty(configName, option, optionData[option]);
		    }
	    }
    },

    /**
     * 初始化配置
     */
    PlayerLogin:function(heroID){

    	heroID = heroID.toString();

    	//初始化
        if (!this.HaveConfigProperty(heroID, this.linkServer)){
            this.SetConfigProperty(heroID, this.linkServer, {});
        }

        let playerDataDict = this.GetConfigProperty(heroID, this.linkServer);
        //初始化失败
        if(!playerDataDict){
        	cc.error("PlayerLogin(%s) fail", heroID);
            return
        }

	    for(var property in this.PlayerInitData){
		    if(!playerDataDict.hasOwnProperty(property)){
			    playerDataDict[property] = this.PlayerInitData[property];
		    }
	    }
        this.SetConfigProperty(heroID, this.linkServer, playerDataDict);

    },


    //--------------------------获取接口----------------------------------
    /**
     * 获取配置值
     * @param configName
     * @param option
     * @param value
     */
    SetConfigProperty:function(configName, option, value){

	    let canUse = cc.sys.localStorage.CanUse;
		cc.log("canUse",canUse);
	    let configInfo = {};
	    if(true){
		    configInfo = cc.sys.localStorage.getItem(configName);
		    if (configInfo){
			    configInfo = JSON.parse(configInfo);
		    }
		    //如果没有初始化
		    else{
			    configInfo = {};
		    }

		    configInfo[option] = value;

		    //如果多开客户端，会出现数据不能被保存，因为底层只接受一个数据连接请求
		    cc.sys.localStorage.setItem(configName, JSON.stringify(configInfo));
	    }
	    else{
           configInfo = this.InitDataDict[configName];
           if(!configInfo){
               cc.error("SetConfigProperty not find(%s)", configName);
            return false
           }
           configInfo[option] = value;
        }


        return true;
    },

    /**
     * 获取玩家登录服务器本地数据
     * @param configName
     * @param option
     */
    SetPlayerConfigProperty:function(heroID, option, value){
	    heroID = heroID.toString();

	    let canUse = cc.sys.localStorage.CanUse;
	    if(true){

		    let configInfo = cc.sys.localStorage.getItem(heroID)
		    if (configInfo){
			    configInfo = JSON.parse(configInfo);
		    }
		    else{
			    configInfo = {};
		    }

		    //如果没有服务器数据,则初始化
		    if(!configInfo.hasOwnProperty(this.linkServer)){
			    configInfo[this.linkServer] = {};
		    }

		    let serverDataDict = configInfo[this.linkServer];
		    serverDataDict[option] = value;

		    //如果多开客户端，会出现数据不能被保存，因为底层只接受一个数据连接请求
		    cc.sys.localStorage.setItem(heroID, JSON.stringify(configInfo));
	    }
	    else{
		    this.PlayerInitData[option] = value;
	    }

        return true;

    },

    //--------------------------设置接口----------------------------------
    /**
     * 设置配置值
     * @param configName
     * @param option
     */
    GetConfigProperty:function(configName, option){
	    configName = configName.toString();

	    let canUse = cc.sys.localStorage.CanUse;

        let configInfo = {};
		if(true){
			configInfo = cc.sys.localStorage.getItem(configName);
			if (configInfo){
				configInfo = JSON.parse(configInfo);
			}
		}
		//可能运行环境没有支持localStorage,则取默认字典数据
	    else{
			configInfo = this.InitDataDict[configName];

			cc.error("GetConfigProperty fail, configName:%s option:%s is not find", configName, option);
		}

	    if(!configInfo){
            cc.error("GetConfigProperty(%s,%s)", configName, option);

		    return
	    }

        if (!configInfo.hasOwnProperty(option)){
            cc.error("GetConfigProperty fail, not find the option:%s", option);

            return;
        }

        return configInfo[option]
    },

    /**
     * 获取玩家登录服务器本地数据
     * @param configName
     * @param option
     */
    GetPlayerConfigProperty:function(heroID, option){

        heroID = heroID.toString();
	    let canUse = cc.sys.localStorage.CanUse;
	    let serverDataDict = {};

	    if(true){
		    let configInfo = cc.sys.localStorage.getItem(heroID)
		    if (configInfo){
			    configInfo = JSON.parse(configInfo);
			    if (!configInfo.hasOwnProperty(this.linkServer)){
				    this.ErrLog("GetPlayerConfigProperty(%s) fail, not find the linkServer:%s", heroID, this.linkServer);
				    return;
			    }
			    serverDataDict = configInfo[this.linkServer]
		    }
	    }
	    else{
		    serverDataDict = this.PlayerInitData;
		    this.ErrLog("GetPlayerConfigProperty fail, heroID:%s option:%s is not find", heroID, option);
	    }

        if(!serverDataDict.hasOwnProperty(option)){
            this.ErrLog("GetPlayerConfigProperty(%s,%s) not find %s", heroID, this.linkServer, option);
            return
        }

        return serverDataDict[option];
    },

    //--------------------------判断接口----------------------------------
    /**
     * 判断是否存在配置值
     * @param configName
     * @param option
     */
    HaveConfigProperty:function(configName, option){

        let configInfo = cc.sys.localStorage.getItem(configName)
        if (!configInfo){
            return false;
        }
        configInfo = JSON.parse(configInfo);
        if (!configInfo.hasOwnProperty(option)){
            return false;
        }
        return true;
    },

    HavePlayerConfigProperty:function(heroID, option){

        heroID = heroID.toString();
        let configInfo = cc.sys.localStorage.getItem(heroID)
        if (!configInfo){
            return false;
        }
        configInfo = JSON.parse(configInfo);
        if (!configInfo.hasOwnProperty(this.linkServer)){
            return false;
        }
        let serverDataDict = configInfo[this.linkServer];

        return serverDataDict.hasOwnProperty(option);
    },

    //--------------------------操作接口----------------------------------
    /**
     * 删除配置值
     * @param configName
     * @param option
     */
    Remove:function(configName){
        cc.sys.localStorage.removeItem(configName);
    },

});


var g_LocalDataManager = null;

/**
 * 绑定模块外部方法
 */
exports.GetModel = function(){
    if(!g_LocalDataManager){
        g_LocalDataManager = new LocalDataManager();
    }
    return g_LocalDataManager;
}