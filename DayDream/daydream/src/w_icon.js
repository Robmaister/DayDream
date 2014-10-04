var w_key_ddr = cc.Class.extend({
    ctor : function(space, posX){
        this._super(res.proto_w);
        this.space = space;
        var body = new cp.StaticBody();
        body.setPos(cc.p(posX, 10));

    }
})