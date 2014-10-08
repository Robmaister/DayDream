var DebugMenuLayer = cc.Layer.extend({
	sprite:null,
	ctor:function() {
		this._super();
		
		menuArray = ["Play!"];
		
		/*var listView = new ccui.ListView();
		
		listView.setDirection(ccui.ScrollVeiew.DIR_VERTICAL);
		listView.setTouchEnabled(true);
		listView.setBounceEnabled(true);
		listView.addEventListener(this.selectItemEvent, this);*/
		
		var winSize = cc.director.getWinSize();
		
		var penX = winSize.width / 2;
		var penY = winSize.height - c_debugMenuBtnHeight - c_debugMenuMargin;
		for (var i in menuArray)
		{
			var button = new ccui.Button();
			button.setTitleText(menuArray[i]);
			button.setTouchEnabled(true);
			button.setScale9Enabled(true);
			button.loadTextures("res/cocosui/button.png", "res/cocosui/buttonHighlighted.png", "");
			button.setSize(cc.size(c_debugMenuBtnWidth, c_debugMenuBtnHeight));
			button.x = penX;
			button.y = penY;
			button.addTouchEventListener(this.selectItemEvent, this);
			this.addChild(button);
			
			penY -= c_debugMenuBtnHeight + c_debugMenuMargin;
		}
	},
	
	selectItemEvent: function(sender, type) {
		switch (type) {
			case ccui.Widget.TOUCH_ENDED:
				var newScene = null;
				switch (sender.getTitleText()) {
					case "Overworld":
						newScene = new OverworldScene();
						break;
					case "DDR Minigame":
						newScene = new HelloWorldScene();
						break;
					case "english class":
						newScene = new ConversationScene();
						break;
				}
				
				if (newScene != null) {
					var trans = new cc.TransitionCrossFade(1, newScene, cc.color(0, 0, 0));
					cc.director.pushScene(trans);
				}
				break;
		}
	},
});

var DebugMenuScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		var layer = new DebugMenuLayer();
		this.addChild(layer);
	}
});