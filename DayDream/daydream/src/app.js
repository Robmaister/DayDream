//sprite class for the icons at the button for timing
var Base_icon = cc.Sprite.extend({
    ctor:function(spite_img, posx,posy){
        if (spite_img == 1){
            this._super(res.w_outline);
        }else if (spite_img == 2){
            this._super(res.a_outline);
        }else if (spite_img == 3){
            this._super(res.s_outline);
        }else if (spite_img == 4){
            this._super(res.d_outline);
        }else{
            this._super(res.salsa_bg);
        }
        this.setScale(.20);
        this.setAnchorPoint(0,0);
        this.setPosition(posx,posy);
    }
})
//individula objects for each of the icons
var W_icon = cc.Sprite.extend({
    ctor:function(posx, posy){
        this._super(res.w_button);
        this.setScale(.20);
        this.setAnchorPoint(0,0);
        this.setPosition(100,posy);
        this.alive = true;
        this.isKeyboardEnabled = true;
        this.timer = 0;
        this.rate = .05;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
        this.timer +=1;
        if ( this.timer % 200 == 0){
            this.rate = 2 * this.rate;
        }
        this.y -= this.rate;
        //this.y -= 5;
    },
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 0){
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }
    
});
var A_icon = cc.Sprite.extend({
    ctor:function(posx,posy){
        this._super(res.a_button);
        this.setScale(.20);
        this.setAnchorPoint(0,0);
        this.setPosition(200,posy);
        this.alive = true;
        this.isKeyboardEnabled = true;
        this.timer = 0;
        this.rate = .05;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
        this.timer +=1;
        if ( this.timer % 200 == 0){
            this.rate = 2 * this.rate;
        }
        this.y -= this.rate;
        //this.y -= 5;
    },
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 0){
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }
    
});
var S_icon = cc.Sprite.extend({
    ctor:function(posx,posy){
        this._super(res.s_button);
        this.setScale(.20);
        this.setAnchorPoint(0,0);
        this.setPosition(300,posy);
        this.alive = true;
        this.timer = 0;
        this.rate = .05;
        this.isKeyboardEnabled = true;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
        this.timer +=1;
        if ( this.timer % 200 == 0){
            this.rate = 2 * this.rate;
        }
        this.y -= this.rate;
        //this.y -= 5;
    },
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 0){
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }

    
}); 
var D_icon = cc.Sprite.extend({
    ctor:function(posx,posy){
        this._super(res.d_button);
        this.setScale(.20);
        this.setAnchorPoint(0,0);
        this.setPosition(400, posy);
        this.alive = true;
        this.timer = 0;
        this.rate = .05;
        this.isKeyboardEnabled = true;
        this.scheduleUpdate();//do this so the update method gets callled
    },
    update:function(dt){
        this.timer +=1;
        if ( this.timer % 200 == 0){
            this.rate = 2 * this.rate;
        }
        this.y -= this.rate;
        //this.y -= 5;
    },
    testing:function(){
        //already pressed the key
        //destroy object
        this.alive = false;
        //valid correction box point ++
        if( this.y < 100 && this.y > 0){
            //or play the you got it animation
            console.log("success");
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }

    
});  
var DDRMAP = cc.TMXTiledMap.extend({
    ctor: function(w_map,s_map,a_map,d_map){
        this._super();
        this.ddr_w_key = [];
        this.map = new cc.TMXTiledMap(res.ddr_map_big);
        this.addChild(this.map, 0, 1);
        //this.initWithTMXFile(res.ddr_map);
        this.analyze(w_map,s_map,a_map,d_map);
        this.scheduleUpdate();
    },
    analyze:function(w_map,s_map,a_map,d_map){
        //creating an object group for each button
        var w_group= this.map.getObjectGroup("w_key");
        var w_array= w_group.getObjects();

        var s_group= this.map.getObjectGroup("s_key");
        var s_array= s_group.getObjects();

        var a_group= this.map.getObjectGroup("a_key");
        var a_array= a_group.getObjects();

        var d_group= this.map.getObjectGroup("d_key");
        var d_array= d_group.getObjects();
        //go through tile map and store all the objects in the layer
        // and generate their strarting position
        for (var i =0; i < w_array.length ; i++){
            //console.log("%d x, %d y ",w_array[i]["x"], w_array[i]["y"]);
            var w_button = new W_icon(w_array[i]["x"], w_array[i]["y"]);
            //var w_button = new w_key_ddr(cc.p(w_array[i]["x"] +this.map.mapwidth, w_array[i],["y"]) );
            w_map.push(w_button);
            //console.log("adding");
        }
        for (var s_iter =0; s_iter < s_array.length ; s_iter++){
            var s_button = new S_icon(s_array[s_iter]["x"], s_array[s_iter]["y"] );
            s_map.push(s_button);
        }
        for (var a_iter =0; a_iter < a_array.length ; a_iter++){
            var a_button = new A_icon(a_array[a_iter]["x"], w_array[a_iter]["y"]);
            a_map.push(a_button);
        }
        for (var d_iter =0; d_iter < d_array.length ; d_iter++){
            var d_button = new D_icon(d_array[d_iter]["x"], d_array[d_iter]["y"]);
            d_map.push(d_button); 
        }
    }
})
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    player:null,
    teacher:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        //music
        cc.audioEngine.playMusic(res.salsa_music,true);
        //creating a map to hold th eobjects for each button
        this.ddr_w_map = [];
        this.ddr_s_map = [];
        this.ddr_a_map = [];
        this.ddr_d_map = [];
        //making background images
        var bg = new cc.Sprite(res.salsa_bg);
        bg.attr({x:600,y:0});
        bg.setScale(1.5);
        this.addChild(bg);
        //Pass the maps in and then add them as children
        this.tilemap = new DDRMAP(this.ddr_w_map,this.ddr_s_map,this.ddr_a_map,this.ddr_d_map);
        for (var l = 0; l < this.ddr_w_map.length ; l ++){
            this.addChild(this.ddr_w_map[l]);
        }
        for (var s_iter = 0; s_iter < this.ddr_s_map.length ; s_iter ++){
            this.addChild(this.ddr_s_map[s_iter]);
        }
        for (var a_iter = 0; a_iter < this.ddr_a_map.length ; a_iter ++){
            this.addChild(this.ddr_a_map[a_iter]);
        }
        for (var d_iter = 0; d_iter < this.ddr_d_map.length ; d_iter ++){
            this.addChild(this.ddr_d_map[d_iter]);
        }
         
        //Making ht e base images to line up
        var temp = new Base_icon(1, 100,10);
        this.addChild(temp);
        temp = new Base_icon(2, 200,10);
        this.addChild(temp);
        temp = new Base_icon(3, 300,10);
        this.addChild(temp);
        temp = new Base_icon(4, 400,10);
        this.addChild(temp);
       

        //Createing/ animating the player dancing
        this.player_animation = cc.Animation.create();
        this.player_anim_frame = [];
        for (var i = 0; i < 4 ; i++){
            var frame = cc.SpriteFrame.createWithTexture(res.student_dance, cc.rect((i *100 ),0 ,100,100)); 
            this.player_anim_frame.push(frame);
        }
        this.player_animation = cc.Animation.create(this.player_anim_frame , .2);
        this.animate = cc.Animate.create(this.player_animation);
        this.sprite = cc.Sprite.createWithTexture(res.student_dance,cc.rect(0,0,100,100));
        this.sprite.attr({x:600, y:500});
        this.runningaction = cc.RepeatForever.create(this.animate);
        this.sprite.runAction(this.runningaction);
        this.addChild(this.sprite);
        //Making the teacher dance
        this.teacher_animation = cc.Animation.create();
        this.teacher_ani_frame = [];
        for (var i = 0; i < 4 ; i++){
            var frame = cc.SpriteFrame.createWithTexture(res.teacher_dance, cc.rect((i *100 ),0 ,100,100)); 
            this.teacher_ani_frame.push(frame);
        }
        this.teacher_animation = cc.Animation.create(this.teacher_ani_frame , .2);
        this.animate = cc.Animate.create(this.teacher_animation);
        this.teacher = cc.Sprite.createWithTexture(res.teacher_dance,cc.rect(0,0,100,100));
        this.teacher.attr({x:700, y:500});
        this.runningaction = cc.RepeatForever.create(this.animate);
        this.teacher.runAction(this.runningaction);
        this.addChild(this.teacher);
;        //enables keyboard input
        this.isKeyboardEnabled = true;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(key,event){
                //grab the target
                var target = event.getCurrentTarget();
                //handle the key input press
                target.handleKeys(key);
            }
        },this);
        this.scheduleUpdate();
    },
    handleKeys:function(key){
        console.log("%d he key", key);
        switch(key){
            //w key
            case 87:
                this.ddr_w_map[0].testing();
                break;
            //d key
            case 68:
                this.ddr_d_map[0].testing();
                break;
            //s key
            case 83:
                this.ddr_s_map[0].testing();
                break;
            //a key
            case 65:
                this.ddr_a_map[0].testing();
                break;
        }
    },

        
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        //var talk_minigame = new newtalk1();
        //this.addChild(talk_minigame);
    }
});
