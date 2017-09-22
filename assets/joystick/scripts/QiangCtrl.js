
var TouchType = cc.Enum({
    DEFAULT: 0,
    FOLLOW: 1
});


cc.Class({
    extends: cc.Component,

    properties: {
       
        radius: 0, //半径
        touchType: {
            default: TouchType.DEFAULT, //触摸类型
            type: TouchType
        },
   
    },

    // use this for initialization
    onLoad: function () {
        
        this.registerInput()
        
       
        this.initPos = this.node.position

        this.node.opacity = 50

    },

    addQiangTouchChangeListener: function (callback) {
        this.isKaiQiang = callback;
    },

    registerInput: function () {
        var self = this;
        // touch input
        this._listener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                return self.onTouchBegan(touch, event)
            },
            onTouchMoved: function (touch, event) {
                self.onTouchMoved(touch, event)
            },
            onTouchEnded: function (touch, event) {
                self.onTouchEnded(touch, event)
            }
        }, self.node);
    },


    onTouchBegan: function (touch, event) {
        this.node.opacity = 100;
        //如果触摸类型为FOLLOW，则摇控杆的位置为触摸位置,触摸开始时候现形
        if (this.touchType == TouchType.FOLLOW) {
           
            var touchPos = this.node.parent.convertToNodeSpaceAR(touch.getLocation());
            if (touchPos.x - this.node.width / 2 < 0) { //在屏幕的右半侧点击
                //event.stopPropagation();
                return false;
            }
            this.node.setPosition(touchPos);
            return true;
        }
        else {
            //把触摸点坐标转换为相对与目标的模型坐标
            var touchPos = this.node.convertToNodeSpaceAR(touch.getLocation())

            if (touchPos.getPosition().x - this.node.weight / 2 < 0) { //在屏幕的右半侧点击
                return false;
            }
            
            return true;
            
        }
        return false;
    },

    onTouchMoved: function (touch, event) {

        

    },
    onTouchEnded: function (touch, event) {

        this.node.opacity = 50

        this.isKaiQiang(true);

        //如果触摸类型为FOLLOW，离开触摸后隐藏
        if (this.touchType == TouchType.FOLLOW) {
            this.node.position = this.initPos
        }


        
    },


    onDestroy: function () {
        cc.eventManager.removeListener(this._listener);
    }

});
