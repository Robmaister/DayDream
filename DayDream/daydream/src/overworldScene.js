var OverworldBackgroundLayer = cc.Layer.extend({
	map_0: null,
	mapWidth: 0,
	mapHeight: 0,
	mapIndex: 0,
	ctor:function(phys) {
		this._super();
		
		this.map_0 = cc.TMXTiledMap.create(res.map_overworld_0);
		this.addChild(this.map_0);
		
		this.mapWidth = this.map_0.getContentSize().width;
		this.mapHeight = this.map_0.getContentSize().height;
		
		this.initWalls(phys);
		
		this.scheduleUpdate();
	},
	update:function(dt) {
		var mainLayer = this.getParent().getChildByTag(c_overworldLayerTag.main);
		var pos = mainLayer.camPos;
		this.setPosition(cc.p(-pos.x, -pos.y));
	},
	initWalls:function(phys) {
		var map = this.map_0;
		var mapWidth = map.getMapSize().width;
		var mapHeight = map.getMapSize().height;
		var tileWidth = map.getTileSize().width;
		var tileHeight = map.getTileSize().height;
		var wallLayer = map.getLayer("Walls");
		wallLayer.visible = false;
		
		var verts = [
			-tileWidth/2, -tileHeight/2,
			-tileWidth/2, tileHeight/2,
			tileWidth/2, tileHeight/2,
			tileWidth/2, -tileHeight/2
		];
		
		for (var i = 0; i < mapWidth; i++) {
			for (var j = 0; j < mapHeight; j++) {
				var tileCoord = cc.p(i, j);
				var gid = wallLayer.getTileGIDAt(tileCoord);
				if (gid) {
					var box = new cp.PolyShape(phys.staticBody, verts, cp.v(i * tileWidth, j * tileHeight));
					phys.addStaticShape(box);
				}
			}
		}
	},
});

var OverworldMainLayer = cc.Layer.extend({
	phys: null,
	player: null,
	camPos: null,
	camMin: null,
	camMax: null,
	moving: [false, false, false, false],
	ctor:function(phys) {
		this._super();

		if (cc.sys.capabilities.hasOwnProperty('keyboard'))
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed:function (key, event) {
					var target = event.getCurrentTarget();
                    switch (key) {
						case cc.KEY.w: target.moving[0] = true; break;
						case cc.KEY.a: target.moving[1] = true; break;
						case cc.KEY.s: target.moving[2] = true; break;
						case cc.KEY.d: target.moving[3] = true; break;
					}
                },
                onKeyReleased:function (key, event) {
					var target = event.getCurrentTarget();
                    switch (key) {
						case cc.KEY.w: target.moving[0] = false; break;
						case cc.KEY.a: target.moving[1] = false; break;
						case cc.KEY.s: target.moving[2] = false; break;
						case cc.KEY.d: target.moving[3] = false; break;
					}
                }
            }, this);
		
		this.phys = phys;
		
		this.player = cc.Sprite.create(res.sprite_student);
		this.player.setPosition(cc.p(420, 2250));
		this.addChild(this.player);
		
		this.camMin = cc.p(0, 0);
		this.camMax = cc.p(0, 0);
		this.camPos = cc.pClamp(cc.p(0, 0), this.camMin, this.camMax);
		
		this.scheduleUpdate();
	},
	update:function(dt) {
		this.phys.step(dt);
		var bgLayer = this.getParent().getChildByTag(c_overworldLayerTag.background);
		var winSize = cc.director.getWinSize();
		this.camMin = cc.p(0, 0);
		this.camMax = cc.p(bgLayer.mapWidth - winSize.width, bgLayer.mapHeight - winSize.height);
		var pos = this.getUnclampedCamPos();
		pos.x -= winSize.width/2;
		pos.y -= winSize.height/2;
		this.camPos = cc.pClamp(pos, this.camMin, this.camMax);
		this.setPosition(cc.p(-this.camPos.x, -this.camPos.y));
		if (this.moving[0])
			cc.log("moving up!");
		else if (this.moving[1])
			cc.log("moving left!");
		else if (this.moving[2])
			cc.log("moving down!");
		else if (this.moving[3])
			cc.log("moving right!");
	},
	onKeyDown:function(e) {
		switch (e) {
			case cc.KEY.w: this.moving[0] = true; break;
			case cc.Key.a: this.moving[1] = true; break;
			case cc.Key.s: this.moving[2] = true; break;
			case cc.Key.d: this.moving[3] = true; break;
		}
	},
	onKeyUp:function(e) {
		switch (e) {
			case cc.KEY.w: this.moving[0] = false; break;
			case cc.Key.a: this.moving[1] = false; break;
			case cc.Key.s: this.moving[2] = false; break;
			case cc.Key.d: this.moving[3] = false; break;
		}
	},
	getUnclampedCamPos:function() {
		if (this.player === undefined || this.player === null) {
			return cc.p(0, 0);
		}
		else {
			return this.player.getPosition();
		}
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
		
		phys = new cp.Space();
		
		this.gameLayer = cc.Layer.create();
		this.addChild(this.gameLayer);
		this.gameLayer.addChild(new OverworldBackgroundLayer(phys), 0, c_overworldLayerTag.background);
		this.gameLayer.addChild(new OverworldMainLayer(phys), 0, c_overworldLayerTag.main);
		this.gameLayer.addChild(new OverworldHudLayer(), 0, c_overworldLayerTag.hud);
		
		//this.addChild(this.gameLayer);
		
		//this.scheduleUpdate();
	},
	update:function (dt) {
		
	},
});