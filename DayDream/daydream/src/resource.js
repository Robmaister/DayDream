var res = {
     proto_a : "res/DDR_game/a_key_proto.png",
     proto_s : "res/DDR_game/s_key_proto.png",
     proto_w : "res/DDR_game/w_key_proto.png",
     proto_d : "res/DDR_game/d_key_proto.png",
     proto_bg: "res/DDR_game/bg_proto.png",
     ddr_map:  "res/DDR_game/DDRmapproto.tmx",
     ddr_map_big: "res/DDR_game/proto_bigmap.tmx",
     w_button: "res/DDR_game/DDR_letter_W.png",
     a_button: "res/DDR_game/DDR_letter_A.png",
     s_button: "res/DDR_game/DDR_letter_S.png",
     d_button: "res/DDR_game/DDR_letter_D.png",

     w_outline: "res/DDR_game/DDR_outline_W.png",
     a_outline: "res/DDR_game/DDR_outline_A.png",
     s_outline: "res/DDR_game/DDR_outline_S.png",
     d_outline: "res/DDR_game/DDR_outline_D.png",

     speech_bubble : "res/DDR_game/speech_bubble.png",

     salsa_music: "res/DDR_game/Salsa_Music.mp3",
     cocosui_btn: "res/cocosui/button.png",
     cocosui_btn_highlight :"res/cocosui/buttonHighlighted.png",
     map_overworld_0: "res/overworld/map_0.tmx",
     map_overworld_png: "res/overworld/map_0.tmx",
     sprite_student: "res/StudentSpriteStill.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}