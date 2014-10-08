var res = {
     proto_a : "res/a_key_proto.png",
     proto_s : "res/s_key_proto.png",
     proto_w : "res/w_key_proto.png",
     proto_d : "res/d_key_proto.png",
     proto_bg: "res/bg_proto.png",
     ddr_map:  "res/DDRmapproto.tmx",
     ddr_map_big: "res/proto_bigmap.tmx",
     w_button: "res/DDR_letter_W.png",
     a_button: "res/DDR_letter_A.png",
     s_button: "res/DDR_letter_S.png",
     d_button: "res/DDR_letter_D.png",

     w_outline: "res/DDR_outline_W.png",
     a_outline: "res/DDR_outline_A.png",
     s_outline: "res/DDR_outline_S.png",
     d_outline: "res/DDR_outline_D.png",

     speech_bubble: "res/speech_bubble.png",
     student_dance: "res/StudentDance.png",
	 student_walk: "res/StudentWalk.png",
     salsa_music: "res/Salsa_Music.mp3",
     cocosui_btn: "res/cocosui/button.png",
     cocosui_btn_highlight :"res/cocosui/buttonHighlighted.png",
     map_overworld_0: "res/overworld/map_0.tmx",
     map_overworld_png: "res/overworld/map.png",
	 sprite_desk: "res/overworld/desk.png",
     sprite_student: "res/StudentSpriteStill.png",
	 sprite_student0: "res/palette_swap_1.png",
	 sprite_student1: "res/palette_swap_3.png",
	 sprite_teacher: "res/TeacherSpriteStill.png",
     teacher_dance: "res/TeacherDance.png",
     salsa_bg: "res/salsa_background.png",
     son_face: "res/AlistairStill.png",
     wife_face:"res/CrawfordStill.png",
     butler_face:"res/SamuelStill.png",
     english_bg:"res/EnglishBackdrop.png",
     conrad_face:"res/ConradStill.png"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}