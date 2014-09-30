var W_icon = cc.Sprite.extend({
    ctor:function(){
        this._super(res.proto_a)
        this.setScale(.25);
        this.setAnchorPoint(0,0);
        this.setPosition(300,300);
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
        this.y -= 1;
        //this.y -= 5;
    },
    handleKey:function(e){
        console.log("herer")
        
    },
    
})
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super(res.proto_bg);
        this.sprite = new W_icon();
        this.addChild(this.sprite);
        //this.isKeyboardEnabled = true;
        console.log("works");
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(key){
                //console.log("Click!")
                this.sprite.handleKey(key);
            }
        },this);
    },
    
        
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);

    }
});

