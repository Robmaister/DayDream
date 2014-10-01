var res = {
     proto_a : "res/a_key_proto.png",
     proto_s : "res/s_key_proto.png",
     proto_w : "res/w_key_proto.png",
     proto_d : "res/d_key_proto.png",
     proto_bg: "res/bg_proto.png",
     ddr_map:  "res/DDRmapproto.tmx",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}