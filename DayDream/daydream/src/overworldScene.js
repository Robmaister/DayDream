var OverworldBackgroundLayer = cc.Layer.extend({
	map_0: null,
	mapWidth: 0,
	mapIndex: 0,
	ctor:function() {
		this._super(res.proto_bg);
		
		this.map_0 = cc.TMXTiledMap.create(res.map_overworld_0);
		this.addChild(this.map_0);
		
		this.mapWidth = this.map_0.getContentSize().width;
		
		this.scheduleUpdate();
	},
	update:function(dt) {
		
	},
});

var OverworldMainLayer = cc.Layer.extend({
	player: null,
	ctor:function() {
		this._super();
		
		this.scheduleUpdate();
	},
	update:function(dt) {
	},
});

var OverworldHudLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		
		this.scheduleUpdate();
	},
	update:function(dt) {
	},
});

var OverworldScene = cc.Scene.extend({
	onEnter:function() {
		this._super();
		
		this.phys = new cp.Space();
		this.phys.gravity = cp.v(0, 0);
		
		this.gameLayer = cc.Layer.create();
		this.gameLayer.addChild(new OverworldBackgroundLayer(), 0, c_overworldLayerTag.background);
		this.gameLayer.addChild(new OverworldMainLayer(), 0, c_overworldLayerTag.main);
		this.gameLayer.addChild(new OverworldHudLayer(), 0, c_overworldLayerTag.hud); 
		
		this.addChild(gameLayer);
		
		this.scheduleUpdate();
	},
	update:function (dt) {
		
	},
});