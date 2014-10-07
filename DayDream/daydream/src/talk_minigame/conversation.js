var newtalk1 = cc.Layer.extend({
    onEnter:function() {
    	console.log("here")
		this._super();
		var button = new ccui.Button();
		button.loadTextures(res.speech_bubble,res.speech_bubble);
		button.setTitleText("Click Me");
		button.setTitleFontName("Marker Felt");
		button.setPosition(400,100);
		button.setTouchEnabled(true);
		button.addTouchEventListener (this.touchEvent,this);
		this.addChild(button);

		this.label = new cc.LabelTTF("A text label");
		this.label.setPosition(400,400);
		this.addChild(this.label);

		var tf = new ccui.TextField();
		this.textField=tf

		tf.setTouchEnabled(true);
		tf.setFontName("Marker Felt");
		tf.setFontSize(16);
		tf.setPlaceHolder("input text here");
		tf.setPosition(400,200);
		this.addChild(tf);
	},
	touchEvent: function (sender, type) {
		switch (type) {
			case ccui.Widget.TOUCH_BEGAN:
			    this.label.setString(this.textField.getString());
			    break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
    }
});
var Conversation = cc.Layer.extend({
	sprite:null,
    ctor:function () {
    	this._super();
    	var first_conversation = new newtalk1();
    }
});
var ConversationScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Conversation();
        this.addChild(layer);
    }
});