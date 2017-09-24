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
        curLevelLabel:cc.Label,

    },

    // use this for initialization
    onLoad: function () {

        this.LocalDataManager = app.LocalDataManager();
        this.level = this.LocalDataManager.GetConfigProperty("SysSetting","choeseLevel");

        this.updateLevelLabel();
    },

    
    onPlay: function () {
        var self = this;
        cc.loader.onProgress = function (completedCount, totalCount, item){
            console.log(completedCount+"/"+totalCount);
        };
        cc.director.preloadScene("CityScene1", function (assets, error){
            //設置關卡
            app.LocalDataManager().SetConfigProperty("SysSetting", "choeseLevel", self.level);
            //跳转到游戏界面
            cc.director.loadScene("CityScene1");
        });
    },

    onUp: function () {
        if(this.level-1 <= 0){
            return;
        }
        this.level -= 1;
        this.updateLevelLabel();
    },

    onNext: function () {
        if(this.level+1 > 20){
            return;
        }
        this.level += 1;
        this.updateLevelLabel();
    },

    updateLevelLabel: function () {
        this.curLevelLabel.string = "Round "+this.level;
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
