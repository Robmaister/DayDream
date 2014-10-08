//Creating the full size background
var backdrop = cc.Sprite.extend({
	ctor:function(){
		//intializes the background
		this._super();
		var winsize = cc.director.getWinSize();
		var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
		BG = new cc.Sprite.create(res.english_bg);
		BG.setPosition(centerpos);
		this.addChild(BG);
	}
})
var newtalk1 = cc.Layer.extend({
	prevScene: null,
	ctor:function(prevScene) {
		this._super();
		this.prevScene = prevScene;
	},
    onEnter:function() {
		this._super();
		
		
		
		//WHEN THIS MINIGAME IS WON, CALL THIS:
		//
		//
		//OR IF YOU LOSE, CALL THIS:
		//this.prevScene.conversationLost();
		//cc.director.popScene();
		
		
		
		
		
		
		//storing first conversation
		this.monologue_first =[
			"Conrad: Today! In this very house,\nin this very room a most heinous crime was committed.",
			"Conrad:MURDER!",
			"Conrad: Poor James Crawford \nnever asked for this knife in his back.",
			"Conrad: But one of you gave it to him anyway.\n Who could it be?",
			"Conrad: Could it be his lovely wife of many years.\n The one who pledged to stay by his side\n in sickness and in health?",
			"Conrad: Or, might it be his son? Little Alistair Crawford. \nThe only child,\n given everything he could ever want and more.",
			"Conrad: Ah, but there is one other \nwho could have committed this dastardly deed.",
			"Conrad: The butler Samuel Edmonton.\n A man who was supposedly loyal to James for many years.",
			"Conrad: I detective Conrad will begin the investigation.",
			"Conrad: I shall start with you"
		]
		//setting counter to iterate through it
		this.monologue_first_counter = 0;
		//Butler's introduction
		this.butler_info =[
			"Conrad: You, Samuel...The faithful butler.\n You must have spend many hours at his side.",
			"Samuel: James and I were very close \nand I learned many things from him.",
			"Alistair: Like how to be a footrest?",
			"Conrad: What?",
			"Alistair: Everyone knew that my father enjoyed \nembarrassing Samuel in every way \nthat he could.",
			"Alistair: Most nights after Samuel made daddy's tea, \ndaddy would ask Samuel to get down on his hands and knees \nand become his footrest.",
			"Samuel: The demands of the job are ever changing.",
			"Alistair: I've talked to the kitchen staff. \nYou badmouthed daddy at every chance you could.",
			"Alistair: The other servants said that you\n had plans to poison his tea.",
			"Samuel: That was merely dark humour shared among friends.\n It was not a plan and as you can see, \nif I had poisoned him, it clearly did not work.",
			"Conrad: I can see how you would have reason to kill him...\nbut I'm not sure I'm convinced.",
			"Conrad: I should hear from"
		]
		//a counter and a bool to see if already done
		this.butler_info_counter = 0;
		this.butler_info_bool = false;
		//The wifes introduction text
		this.wife_info = [
			"Conrad: Yes you Mrs. Crawford...\nwhen I talked with the help,\n I found out that you and your late husband\n no longer shared a room.",
			"Conrad: In fact you decided to move into a bedroom \non the other side of the mansion a few years ago.",
			"Conrad: What reason could there be for that?",
			"Samuel: (snickers)",
			"Conrad: Samuel! \nDo you have something to say on this matter?",
			"Samuel: If I may be frank, \nthe man was fruitier than a banana daiquiri.",
			"Alistair:You're not Frank...your name is Samuel...I think.",
			"Samuel:...",
			"Samuel: Several years ago Mr. Crawford\n decided that he...preferred the company of other men.",
			"Mrs. Crawford: YOU SWORE \nYOU WOULD NEVER TELL!!!",
			"Samuel: That promise was to Mr.Crawford...not to you.",
			"Mrs. Crawford: It's true...\nbut I loved my husband and he loved me.",
			"Samuel: He loved everyone in his own way.",
			"Mrs.Crawford: It's true.\n If his secret were to be exposed\n it would be the social death of me.\n The other women at the garden club would gossip.",
			"Mrs. Crawford: It would be terrible!",
			"Mrs. Crawford: I'd be the laughing stock of the country club.\n They would make me team up with Gladys for bridge \nand she's so old she can't even see the cards.",
			"Mrs. Crawford: But that isn't enough of a reason \nto kill my husband.",
			"Conrad: I will be the judge of that.",
			"Conrad: Now, I think I will hear from"
		]
		//counter and check if already done
		this.wife_info_counter = 0;
		this.wife_info_bool = false;
		//son's introduction text
		this.son_info = [
			"Conrad: Alistair...Mr. Crawford's one and only son.\n What motive could you possibly have for killing your father.",
			"Alistair: ummm....none?",
			"Mrs. Crawford: Money. The snivelling little shit\n was always after my husband for money.",
			"Alistair: I resent that. I keep very clean and I loved daddy.",
			"Mrs. Crawford: Only when he bought things for you,\n and he was always buying things for you.",
			"Mrs. Crawford: I know you've read his will...\nboy never did have much respect for privacy.",
			"Mrs. Crawford: You knew that he left you \na sizeable amount of money.",
			"Alistair: Mother!? Are you trying to accuse me of something?",
			"Mrs. Crawford: I'm accusing you of murdering your father\n you imbecile.",
			"Mrs. Crawford: Why couldn't you be smart like Mabel's boy. \nHe's a professor at Oxford.",
			"Mrs. Crawford: The only notable thing you've ever actually \naccomplished was murdering your father.",
			"Alistair: Why would I kill father?\n He was about to change his will to leave me nothing.",
			"Alistair: He wanted to donate most of his fortune to the poor.\n Who does that?",
			"Mrs.Crawford: Samuel, did you know that?",
			"Samuel: I did not.",
			"Alistair: oh...I didn't kill him.",
			"Conrad: interesting....interesting....\nI think I need to hear more from"
		]
		//counter and check if already done
		this.son_info_counter = 0;
		this.son_info_bool = false;
		//text if mother is criminal
		this.mom_criminal = [
			"Conrad: The murderer is you Mrs. Crawford!",
			"Mrs. Crawford: It's true... \nI couldn't live with the shame \nof being married to a man like that.",
			"Mrs. Crawford: If my friends found out... I would be ruined.",
			"Mrs. Crawford: I thought that if I got him out of the way \nI could go back to having a normal life.",
			"Mrs. Crawford: I had planned to poison his tea \nand blame Samuel but the man would not die.",
			"Mrs. Crawford: I became desperate \nand couldn't take it any more...\nso I killed my husband.",
			"Mrs. Crawford: And the funeral \nwould have been a lavish event.",
			"Mrs. Crawford: I can just see myself \nin a new black dress; \nI'd be the talk of the town for months!",
			"Mrs. Crawford: It would have been perfect.",
			"Mrs. Crawford: Surely there must be some mercy \nin your heart for an old woman \nwho just wanted a normal life?",
			"Conrad: Not today ma'am. "
		]
		//iterate through text
		this.mom_criminal_counter = 0;
		//butler is the criminal text
		this.butler_criminal =[
			"Conrad: The murderer is you Samuel!",
			"Samuel: Well the old bastard deserved it",
			"Samuel: Using me as a footrest...How dare he.",
			"Samuel: I knew Alistair was as means as he was dumb,\n so I figured I could stab James to death \nand blame the boy.",
			"Samuel: Clearly I was wrong,\nbut if I could still blame the boy I would like to.",
			"Samuel: Oh well... maybe I can serve tea in prison.",
			"Conrad: There is no tea in prison.",
			"Samuel: Then I will find something else to serve."
		]
		//iterate through the butler text
		this.butler_criminal_counter = 0;
		//son is the criminal
		this.son_criminal =[
			"Conrad: The murderer is you Alistair!",
			"Alistair: How could you accuse me of that?",
			"Conrad: Because you killed him.",
			"Alistair: You can't prove that \nI came in here and stabbed daddy.",
			"AListair: No one was around, \nand I thought that I could blame mother.",
			"Alistair: Oh...can I take that back?",
			"Mrs. Crawford: Never was a clever boy.",
			"Alistair: Well you got me. I killed him, \nbut the money should be mine.",
			"Alistair: I deserve it, \nnot some starving street urchin. \nWhat have the poor every done for daddy?",
			"Alistair: Giving his money to those who don't deserve\n it is the real crime. \nArrest him for that.",
			"Conrad: Arrest the dead man?",
			"Alistair: Yes.",
			"Conrad: I'm afraid I can't do that.",
			"Conrad: But I will be able to carry out justice \non a murderer today. \nCome with me Alistair."
		]
		//iterate through text.
		this.son_criminal_counter = 0;
		this.criminal_bool = false;
		//creating initial buttons
		var button = new ccui.Button();
		button.loadTextures(res.speech_bubble);
		button.setTitleText(this.monologue_first[this.monologue_first_counter]);
		button.setTitleFontName("Marker Felt");
		button.setTitleColor(255,255,255);
		button.setPosition(400,100);
		button.setTouchEnabled(true);
		button.addTouchEventListener (this.touchEvent,this);
		this.addChild(button);
		//create background
		this.background_img = new backdrop();
		this.addChild(this.background_img);

	},
	Butler_info:function(sender,type){
		//make button before unseen and create background
		this.removeAllChildren();
		this.addChild(this.background_img);
		switch(type){
			case ccui.Widget.TOUCH_BEGAN:
				//button to go through text
				var button = new ccui.Button();
			    button.loadTextures(res.speech_bubble);
				button.setTitleText(this.butler_info[this.butler_info_counter]);
				button.setTitleFontName("Marker Felt");
				button.setTitleColor(255,255,255);
				button.setPosition(400,100);
				button.setTouchEnabled(true);
				//icons of characters speaking
				if (this.butler_info_counter== 1){
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}else if (this.butler_info_counter == 2){
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
					var left_sprite = cc.Sprite.create(res.son_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
				}else if (this.butler_info_counter ==3 || this.butler_info_counter ==4 || this.butler_info_counter ==5){
					var left_sprite = cc.Sprite.create(res.son_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
				}else if ( this.butler_info_counter == 6|| this.butler_info_counter == 7||this.butler_info_counter == 8||this.butler_info_counter == 9){
					var left_sprite = cc.Sprite.create(res.son_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}else if (this.butler_info_counter ==10 ||this.butler_info_counter == 11){
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}
				//Reached the end of talking now go back to starting point
				if (this.butler_info_counter == 11){
					this.butler_info_bool = true;
					button.addTouchEventListener(this.touchEvent,this);				
				}else{
					//if not keep coming back and iterate through text
					button.addTouchEventListener (this.Butler_info,this);
					this.butler_info_counter += 1;
				}
				this.addChild(button);
				break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
	},
	Mom_info:function(sender,type){
		//make everything disappear and create backdrop
		this.removeAllChildren();
		this.addChild(this.background_img);
		switch(type){
			case ccui.Widget.TOUCH_BEGAN:
				//button to iterate through text
				var button = new ccui.Button();
			    button.loadTextures(res.speech_bubble);
				button.setTitleText(this.wife_info[this.wife_info_counter]);
				button.setTitleFontName("Marker Felt");
				button.setTitleColor(255,255,255);
				button.setPosition(400,100);
				button.setTouchEnabled(true);

				//placing the talking icons around textbox
				if (this.wife_info_counter == 3|| this.wife_info_counter == 4|| this.wife_info_counter == 5){
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}else if (this.wife_info_counter == 6|| this.wife_info_counter == 7||this.wife_info_counter == 8 ){
					var left_sprite = cc.Sprite.create(res.son_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}else if (this.wife_info_counter == 9||this.wife_info_counter == 10||this.wife_info_counter == 11|| this.wife_info_counter == 12||this.wife_info_counter == 13||this.wife_info_counter == 14||this.wife_info_counter == 15||this.wife_info_counter == 16){
					var left_sprite = cc.Sprite.create(res.wife_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}else{
					var left_sprite = cc.Sprite.create(res.wife_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
				}  
				//reached the end on conversation 
				if (this.wife_info_counter == 17){
					this.wife_info_bool = true;
					button.addTouchEventListener(this.touchEvent,this);
				}else{
					button.addTouchEventListener (this.Mom_info,this);
					this.wife_info_counter += 1;
				}
				this.addChild(button);
				break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
	},
	Son_info:function(sender,type){
		//remove all sprites and place backdrop on the screen
		this.removeAllChildren();
		this.addChild(this.background_img);
		switch(type){
			case ccui.Widget.TOUCH_BEGAN:
				//Button to iterate trough text
				var button = new ccui.Button();
			    button.loadTextures(res.speech_bubble);
				button.setTitleText(this.son_info[this.son_info_counter]);
				button.setTitleFontName("Marker Felt");
				button.setTitleColor(255,255,255);
				button.setPosition(400,100);
				button.setTouchEnabled(true);
				if (this.son_info_counter == 1){
					var right_sprite = cc.Sprite.create(res.son_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}else if (this.son_info_counter == 14){
					var left_sprite = cc.Sprite.create(res.wife_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
					var right_sprite = cc.Sprite.create(res.butler_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}else if (this.son_info_counter == 15){
					var left_sprite = cc.Sprite.create(res.son_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
				}else{
					var left_sprite = cc.Sprite.create(res.wife_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
					var right_sprite = cc.Sprite.create(res.son_face);
					right_sprite.setPosition(700,200);
					this.addChild(right_sprite);
				}
				//reached end of text
				if (this.son_info_counter == 15){
					this.son_info_bool = true;
					button.addTouchEventListener(this.touchEvent,this);
				}else{
					button.addTouchEventListener (this.Son_info,this);
					
					this.son_info_counter += 1;
				}
				this.addChild(button);
				break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
	},
	Butler_evil:function(sender,type){
		//remove sprites and replace with backdrop
		this.removeAllChildren();
		this.addChild(this.background_img);
		switch(type){
			case ccui.Widget.TOUCH_BEGAN:
				//button iterate through text
				var button = new ccui.Button();
			    button.loadTextures(res.speech_bubble);
				button.setTitleText(this.butler_criminal[this.butler_criminal_counter]);
				button.setTitleFontName("Marker Felt");
				button.setTitleColor(255,255,255);
				button.setPosition(400,100);
				button.setTouchEnabled(true);
				//icon set up
				if (this.butler_criminal_counter > 0){
					var sprite = cc.Sprite.create(res.butler_face);
					sprite.setPosition(700,200);
					this.addChild(sprite);
				}
				//game is over
				if (this.butler_criminal_counter == 7){
					this.prevScene.conversationWon();
					cc.director.popToSceneStackLevel(2);
				}else{
					button.addTouchEventListener (this.Butler_evil,this);
					
					this.butler_criminal_counter += 1;
				}
				this.addChild(button);
				break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
	},
	Mom_killer:function(sender,type){
		//remove sprite and set up background
		this.removeAllChildren();
		this.addChild(this.background_img);
		switch(type){
			case ccui.Widget.TOUCH_BEGAN:
				//button to iterate through text
				var button = new ccui.Button();
			    button.loadTextures(res.speech_bubble);
				button.setTitleText(this.mom_criminal[this.mom_criminal_counter]);
				button.setTitleFontName("Marker Felt");
				button.setTitleColor(255,255,255);
				button.setPosition(400,100);
				button.setTouchEnabled(true);
				//set up icons
				if (this.mom_criminal_counter > 0){
					var sprite = cc.Sprite.create(res.wife_face);
					sprite.setPosition(700,200);
					this.addChild(sprite);
				}
				if (this.mom_criminal_counter == 9){
					this.prevScene.conversationWon();
					cc.director.popToSceneStackLevel(2);
				}else{
					button.addTouchEventListener (this.Mom_killer,this);
					
					this.mom_criminal_counter += 1;
				}
				this.addChild(button);
				break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
	},
	Son_killer:function(sender,type){
		//remove and replace with backdrop
		this.removeAllChildren();
		this.addChild(this.background_img);
		switch(type){
			case ccui.Widget.TOUCH_BEGAN:
				//button to iterate through txt
				var button = new ccui.Button();
			    button.loadTextures(res.speech_bubble);
				button.setTitleText(this.son_criminal[this.son_criminal_counter]);
				button.setTitleFontName("Marker Felt");
				button.setTitleColor(255,255,255);
				button.setPosition(400,100);
				button.setTouchEnabled(true);
				//setting up icons
				if ( this.son_criminal_counter == 6){
					var left_sprite = cc.Sprite.create(res.wife_face);
					left_sprite.setPosition(100,200);
					this.addChild(left_sprite);
				}else if (this.son_criminal_counter >0){
					var rightsprite = cc.Sprite.create(res.son_face);
					rightsprite.setPosition(700,200);
					this.addChild(rightsprite);
				}
				if (this.son_criminal_counter == 12){
					this.prevScene.conversationWon();
					cc.director.popToSceneStackLevel(2);
				}else{
					button.addTouchEventListener (this.Son_killer,this);
					
					this.son_criminal_counter += 1;
				}
				this.addChild(button);
				break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
	},
	touchEvent: function (sender, type) {
		switch (type) {
			case ccui.Widget.TOUCH_BEGAN:
				//if still in monlogue stay in it
				if (this.monologue_first_counter < 10){
					var button = new ccui.Button();
				    button.loadTextures(res.speech_bubble);
					button.setTitleText(this.monologue_first[this.monologue_first_counter]);
					button.setTitleFontName("Marker Felt");
					button.setTitleColor(255,255,255);
					button.setPosition(400,100);
					button.setTouchEnabled(true);
					button.addTouchEventListener (this.touchEvent,this);
					this.addChild(button);
					this.monologue_first_counter += 1;
			    }
			    //monologue has ended
			    //go through each person introductions
				if (this.monologue_first_counter ==10){
					//Butler
					console.log("here %d mom ", this.wife_info_counter);
					this.removeAllChildren();
					this.addChild(this.background_img);
					if (this.butler_info_bool == false){
						var buttonbutler = new ccui.Button();
						buttonbutler.loadTextures(res.speech_bubble);
						buttonbutler.setTitleText("Samuel");
						buttonbutler.setTitleFontName("Marker Felt");
						buttonbutler.setTitleColor(255,255,255);
						buttonbutler.setPosition(400,500);
						buttonbutler.setTouchEnabled(true);
						buttonbutler.addTouchEventListener (this.Butler_info,this);
						
						this.addChild(buttonbutler);
					}
					//wife
					if (this.wife_info_bool == false){
						var buttonmom = new ccui.Button();
						buttonmom.loadTextures(res.speech_bubble);
						buttonmom.setTitleText("Mrs. Crawford");
						buttonmom.setTitleFontName("Marker Felt");
						buttonmom.setTitleColor(255,255,255);
						buttonmom.setPosition(400,300);
						buttonmom.setTouchEnabled(true);
						buttonmom.addTouchEventListener (this.Mom_info,this);
						this.addChild(buttonmom);
					}
					//son
					if (this.son_info_bool == false){
						var buttonson = new ccui.Button();
						buttonson.loadTextures(res.speech_bubble);
						buttonson.setTitleText("Alistair");
						buttonson.setTitleFontName("Marker Felt");
						buttonson.setTitleColor(255,255,255);
						buttonson.setPosition(400,100);
						buttonson.setTouchEnabled(true);
						buttonson.addTouchEventListener (this.Son_info,this);
						this.addChild(buttonson);
					}
				}
				//all introductions are over choose criminal
				if (this.butler_info_bool == true && this.wife_info_bool == true && this.son_info_bool == true){
					if ( this.monologue_first_counter ==10){
						//final speech bubble
						var button = new ccui.Button();
					    button.loadTextures(res.speech_bubble);
						button.setTitleText("Conrad: I think I heard enough... the killer is");
						button.setTitleFontName("Marker Felt");
						button.setTitleColor(255,255,255);
						button.setPosition(400,100);
						button.setTouchEnabled(true);
						button.addTouchEventListener (this.touchEvent,this);
						this.addChild(button);
						this.monologue_first_counter +=1;
					}
					//butler
					var buttonbutler = new ccui.Button();
					buttonbutler.loadTextures(res.speech_bubble);
					buttonbutler.setTitleText("Samuel");
					buttonbutler.setTitleFontName("Marker Felt");
					buttonbutler.setTitleColor(255,255,255);
					buttonbutler.setPosition(400,500);
					buttonbutler.setTouchEnabled(true);
					buttonbutler.addTouchEventListener (this.Butler_evil,this);
					this.addChild(buttonbutler);

					//mother
					var buttonmom = new ccui.Button();
					buttonmom.loadTextures(res.speech_bubble);
					buttonmom.setTitleText("Mrs. Crawford");
					buttonmom.setTitleFontName("Marker Felt");
					buttonmom.setTitleColor(255,255,255);
					buttonmom.setPosition(400,300);
					buttonmom.setTouchEnabled(true);
					buttonmom.addTouchEventListener (this.Mom_killer,this);
					this.addChild(buttonmom);

					//son
					var buttonson = new ccui.Button();
					buttonson.loadTextures(res.speech_bubble);
					buttonson.setTitleText("Alistair");
					buttonson.setTitleFontName("Marker Felt");
					buttonson.setTitleColor(255,255,255);
					buttonson.setPosition(400,100);
					buttonson.setTouchEnabled(true);
					buttonson.addTouchEventListener (this.Son_killer,this);
					this.addChild(buttonson);
				}
			    break;
			case ccui.Widget.TOUCH_MOVED:
			    break;
			case ccui.Widget.TOUCH_ENDED:
			    break;
			case ccui.Widget.TOUCH_CANCELED:
			    break;
			default:
			    break;
		}
    }
});

var ConversationScene = cc.Scene.extend({
	prevScene: null,
	ctor:function(prevScene) {
		this._super();
		this.prevScene = prevScene;
	},
    onEnter:function () {
        this._super();
        var layer = new newtalk1(this.prevScene);
        this.addChild(layer);
    }
});