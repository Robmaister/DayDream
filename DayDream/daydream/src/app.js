var W_icon = cc.Sprite.extend({
    ctor:function(){
        this._super(res.proto_w);
        this.setScale(.25);
        this.setAnchorPoint(0,0);
        this.setPosition(300,300);
        this.alive = true;
        this.isKeyboardEnabled = true;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
         
        this.y -= .05;
        //this.y -= 5;
    },
    /*move_right:function(){
        console.log("right");
        this.x += 10;
    },
    handleKey:function(keycode){
        console.log("herer");
        
    },
    printing_stuff:function(){
        console.log("nothing");
    },*/
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 10){
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }
    
});
var A_icon = cc.Sprite.extend({
    ctor:function(){
        this._super(res.proto_a);
        this.setScale(.25);
        this.setAnchorPoint(0,0);
        this.setPosition(500,300);
        this.alive = true;
        this.isKeyboardEnabled = true;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
         
        this.y -= .05;
        //this.y -= 5;
    },
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 10){
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }
    
});
var S_icon = cc.Sprite.extend({
    ctor:function(){
        this._super(res.proto_s);
        this.setScale(.25);
        this.setAnchorPoint(0,0);
        this.setPosition(700,300);
        this.alive = true;
        this.isKeyboardEnabled = true;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
         
        this.y -= .05;
        //this.y -= 5;
    },
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 10){
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }
    
}); 
var D_icon = cc.Sprite.extend({
    ctor:function(){
        this._super(res.proto_d);
        this.setScale(.25);
        this.setAnchorPoint(0,0);
        this.setPosition(200,300);
        this.alive = true;
        this.isKeyboardEnabled = true;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
         
        this.y -= .05;
        //this.y -= 5;
    },
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 10){
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }
    
});  
var DDRMAP = cc.TMXTiledMap.extend({
    ctor: function(){
        this._super(res.ddr_map);
        this.map = new cc.TMXTiledMap(res.ddr_map);
        this.addChild(this.map, 0, 1);
        //this.initWithTMXFile(res.ddr_map);
        this.analyze();
    },
    analyze:function(){
        this.obstacles =[];
        this.mapWidth = this.getMapSize().width;
        this.mapHeight = this.getMapSize().height;
        this.tileWidth = this.getTileSize().width;
        this.tileHeight = this.getTileSize().height;
        this.icon_layer = this.map.getLayer("object2");
        if (this.icon_layer == null){
            console.log("wrong");
        }
        var i , j;
        for (i = 0; i < this.mapWidth; i++){
            for (j = 0; j <this. mapHeight; j++){
                var tileCoord = new cc.Point(i, j);
                var gid = this.icon_layer.getTileGIDAt(tileCoord);
                if(gid) {
                    var tileXPositon = i * this.tileWidth;
                    var tileYPosition = (this.mapHeight * this.tileHeight) - ((j+1) * this.tileHeight);
                    var react = cc.rect(tileXPositon, tileYPosition, this.tileWidth, this.tileHeight);
                    this.obstacles.push(react);
                }
            }
        }
    }
})
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super(res.proto_bg);
        this.icon_w = new W_icon();
        this.addChild(this.icon_w);
        var w_list = [this.icon_w];

        this.icon_a = new A_icon();
        this.addChild(this.icon_a);

        this.icon_s = new S_icon();
        this.addChild(this.icon_s);

        this.icon_d = new D_icon();
        this.addChild(this.icon_d);

        this.tilemap = new DDRMAP();

        this.isKeyboardEnabled = true;
        console.log("works");
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(key,event){
                //grab the target
                var target = event.getCurrentTarget();
                //handle the key input press
                target.handleKeys(key);
            }
        },this);

    },
    handleKeys:function(key){
        console.log("%d he key", key);
        switch(key){
            //w key
            case 87:
                this.icon_w.testing();
                break;
            //d key
            case 68:
                this.icon_d.testing();
                break;
            //s key
            case 83:
                this.icon_s.testing();
                break;
            //a key
            case 65:
                this.icon_a.testing();
                break;
        }
    },

        
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);

    }
});

