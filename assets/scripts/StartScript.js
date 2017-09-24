var app = require("app");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        //全局数据
        if(!cc.globalData){
            cc.globalData = {};
        }

        if(!this.InitModel()){
            this.ErrLog("OnInitClientFinish InitModel fail");
            return
        }
        
    },

    //初始化模块
    InitModel:function(){
        let modelName = "";
        try{
            let NeedCreateList = app.NeedCreateList;
            let count = NeedCreateList.length;
            for(let index=0; index<count; index++){
                modelName = NeedCreateList[index];
                //设置所有单例引用接口到app
                app[modelName] = require(modelName).GetModel;
                cc.log("OnLoad require(%s)", modelName);
            }
        }
        catch(error){
            cc.log("OnLoad require(%s) error:%s", modelName, error.stack);
            return false
        }

        return true;
    },

    loadChoiceScene: function() {
        cc.director.loadScene("ChoiceScene");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
