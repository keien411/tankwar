/*
    客户端自定义基类
*/



var BaseClass = cc.Class({

    extends: cc.Class,

	ctor:function(){
		var argList = Array.prototype.slice.call(arguments);

		this.JS_Name = "BaseClass";
		this.Init.apply(this, argList);
	},

	Init:function(){
	},

});


module.exports = BaseClass;

