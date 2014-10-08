var OverworldBackgroundLayer = cc.Layer.extend({
	map_0: null,
	mapWidth: 0,
	mapHeight: 0,
	mapIndex: 0,
	triggers: [],
	ctor:function(phys) {
		this._super();
		
		this.map_0 = cc.TMXTiledMap.create(res.map_overworld_0);
		this.addChild(this.map_0);
		
		this.mapWidth = this.map_0.getContentSize().width;
		this.mapHeight = this.map_0.getContentSize().height;
		
		this.initWalls(phys);
		this.initDesks(phys);
		this.initTriggers(phys);
		
		this.scheduleUpdate();
	},
	update:function(dt) {
		var mainLayer = this.getParent().getChildByTag(c_overworldLayerTag.main);
		var pos = mainLayer.camPos;
		this.setPosition(cc.p(-pos.x - 32, -pos.y + 32));
	},
	initWalls:function(phys) {
		var map = this.map_0;
		var mapWidth = map.getMapSize().width;
		var mapHeight = map.getMapSize().height;
		var tileWidth = map.getTileSize().width;
		var tileHeight = map.getTileSize().height;
		var wallLayer = map.getLayer("Walls");
		wallLayer.visible = false;
		
		for (var i = 0; i < mapWidth; i++) {
			for (var j = 0; j < mapHeight; j++) {
				var tileCoord = cc.p(i, j);
				var gid = wallLayer.getTileGIDAt(tileCoord);
				if (gid != 0) {
					//var box = new cp.PolyShape(phys.staticBody, verts, cp.v(i * tileWidth, this.mapHeight - j * tileHeight));
					var box = new cp.BoxShape(phys.staticBody, tileWidth, tileHeight);
					box.body.p = cp.v(i * tileWidth, this.mapHeight - j * tileHeight);
					phys.addStaticShape(box);
				}
			}
		}
	},
	initDesks:function(phys) {
		var map = this.map_0;
		var mapDesks = map.getObjectGroup("Objects").getObjects();
		for (var i = 0; i < mapDesks.length; i++) {
			var di = mapDesks[i];
			if (di.name != "Desk")
				continue;
			
			var ds = cc.Sprite.create(res.sprite_desk);
			var contentSize = ds.getContentSize();
			var dps = new cp.BoxShape(phys.staticBody, contentSize.width, contentSize.height);
			dps.body.setAngle(di.rotation * Math.PI / 180.0);
			ds.setRotation(di.rotation/* * Math.PI / 180.0*/);
			dps.body.p = cp.v(di.x, di.y);
			ds.setPosition(cc.p(di.x, di.y));
			
			phys.addStaticShape(dps);
			this.addChild(ds);
		}
	},
	initTriggers:function(phys) {
		var map = this.map_0;
		var mapTrigs = map.getObjectGroup("Triggers").getObjects();
		for (var i = 0; i < mapTrigs.length; i++) {
			var mi = mapTrigs[i];
			this.triggers.push({name: mi.name, rect: cc.rect(mi.x, mi.y, mi.width, mi.height)})
		}
	},
});

var OverworldMainLayer = cc.Layer.extend({
	phys: null,
	player: null,
	playerSpeed: 500,
	playerBody: null,
	playerShape: null,
	playerWalkAnim: null,
	playerWalkAction: null,
	camPos: null,
	camMin: null,
	camMax: null,
	moving: [false, false, false, false],
	wonConversation: false,
	wonDDR: false,
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
		
		this.player = new cc.PhysicsSprite(res.sprite_student);
		var contentSize = this.player.getContentSize();
		this.playerBody = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		this.playerBody.p = cc.p(420, 2250);
		this.phys.addBody(this.playerBody);
		
		this.playerShape = new cp.BoxShape(this.playerBody, contentSize.width, contentSize.height);
		this.phys.addShape(this.playerShape);
		this.player.setBody(this.playerBody);
		
        var playerWalkFrames = [];
        for (var i = 0; i < 5 ; i++){
            var frame = cc.SpriteFrame.createWithTexture(res.student_walk, cc.rect((i * 100), 0, 100, 75)); 
            playerWalkFrames.push(frame);
        }
		this.playerWalkAnim = cc.Animation.create(this.playerWalkFrames);
		this.playerWalkAction = cc.RepeatForever.create(cc.Animate.create(this.playerWalkAnim));
		
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
		
		this.playerBody.vx = this.playerBody.vy = 0;
		this.playerBody.w = 0;
		
		var moveAnim = false;
		if (this.moving[0]) {
			moveAnim = true;
			this.playerBody.applyImpulse(cp.v(0, this.playerSpeed), cp.v(0, 0));
			this.playerBody.setAngle(Math.PI);
		}
		if (this.moving[1]) {
		moveAnim = true;
			this.playerBody.applyImpulse(cp.v(-this.playerSpeed, 0), cp.v(0, 0));
			this.playerBody.setAngle(3.0 * Math.PI / 2.0);
		}
		if (this.moving[2]) {
			moveAnim = true;
			this.playerBody.applyImpulse(cp.v(0, -this.playerSpeed), cp.v(0, 0));
			this.playerBody.setAngle(0);
		}
		if (this.moving[3]) {
			moveAnim = true;
			this.playerBody.applyImpulse(cp.v(this.playerSpeed, 0), cp.v(0, 0));
			this.playerBody.setAngle(Math.PI / 2.0);
		}
		
		if (moveAnim) {
			if (this.player.getNumberOfRunningActions() == 0) {
				this.player.runAction(this.playerWalkAction);
			}
		}
		else if (this.player.getNumberOfRunningActions() == 1) {
			this.player.stopAction(this.playerWalkAction);
		}
		
		for (var i = 0; i < bgLayer.triggers.length; i++) {
			var ti = bgLayer.triggers[i];
			if (cc.rectContainsPoint(ti.rect, this.playerBody.p)) {
				var newScene = null;
				switch (ti.name) {
					case "English": if (!this.wonConversation) newScene = new ConversationScene(this); break;
					case "Spanish": if (!this.wonDDR) newScene = new HelloWorldScene(this); break;
				}
				
				if (newScene != null) {
					var trans = new cc.TransitionCrossFade(1, newScene, cc.color(0, 0, 0));
					cc.director.pushScene(trans);
				}
			}
		}
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
	conversationWon:function() {
		cc.log("CONVERSATION WON"); //TODO pipe these back into variables
		this.wonConversation = true;
	},
	conversationLost:function() {
		cc.log("CONVERSATION LOST");
	},
	ddrWon:function() {
		cc.log("DDR WON");
	},
	ddrLost:function() {
		cc.log("DDR LOST");
	}
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
		phys.collisionBias = Math.pow(1 - 0.4, 60); //handle 40% of overlap instead of 10% - can't escape map now.
		
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