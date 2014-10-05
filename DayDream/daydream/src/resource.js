var res = {
     proto_a : "res/a_key_proto.png",
     proto_s : "res/s_key_proto.png",
     proto_w : "res/w_key_proto.png",
     proto_d : "res/d_key_proto.png",
     proto_bg: "res/bg_proto.png",
     ddr_map:  "res/DDRmapproto.tmx",
     ddr_map_big: "res/proto_bigmap.tmx",
	 cocosui_btn: "res/cocosui/button.png",
	 cocosui_btn_highlight: "res/cocosui/buttonHighlighted.png",
	 map_overworld_0: "res/over/map_0.tmx",
	 map_overworld_png: "res/over/map.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}