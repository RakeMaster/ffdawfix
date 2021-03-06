var persName = null;
var clanIcon = null;
var chatFrameLoaded = false;

function setClanIcon( icon ) {
	clanIcon = icon;
	if( chatFrameLoaded ) {
		getTop().window.frames['ChInp'].addClanOption();
	}
}

function getClanIcon() {
	chatFrameLoaded = true;
	return clanIcon;
}

function setPersName(name) {
	if(!persName) {
		persName = name;
		setTitle(name);
	}
}

function setTitle(name) {
	document.getElementsByTagName("title")[0].innerHTML = name;
}

function ffAddonMessage( txt ) {
	getTop().DoMessage( {
		id:"ffMsg",
		time:"FirefoxAddon",
		creator:"",
		txt:txt,
		isMarked:true,
		isPrivate:false,
		isSystem:true,
		isSelf:false,
		isClan:false,
		isBattle:false,
	} );
}

function ffReplaceMessage( msg ) {
	// msg format
	// id:"Msg"
	// time:"02:56"
	// creator:"abc"
	// txt:"abc"
	// isMarked:false
	// isPrivate:false
	// isSystem:true
	// isSelf:false
	// isClan:false
	// isBattle:false
	msg.txt = msg.txt.replace(/http:\/\/darkagesworld\.com\/vr\/battle\/BattleLog\.aspx\?id=[a-f\-0-9]+(?:&amp;page=\d+)?/gi, '<a href="$&" target="_blank" style="color:blue;">$&</a>');
	msg.txt = msg.txt.replace(/<img/g, '<img style="cursor:pointer;" onclick="top.smile(this.src.split(\'.gif\')[0].split(\'/\').pop())"');
	if(msg.isSystem) {
		if(msg.txt.search(/(зашел)|(зашла) в Смутные Времена/) > -1) {
			msg.txt = msg.txt.replace(msg.txt.split('заш')[0].trim(), function(name) {
				return createHTMLPersLink(name);
			});
		}
		if(msg.txt.search('закричала') > -1) {
			msg.txt = msg.txt.replace(msg.txt.split('закричала')[0].trim(), function(name) {
				return createHTMLPersLink(name);
			});
		}
		if(msg.txt.search(/О (ключе)|(шкатулке) спроси/g) > -1) {
			msg.txt = msg.txt.replace(msg.txt.split("у").pop().split(".")[0].trim(), function(name) {
				return createHTMLPersLink(name);
			});
		}
		if(msg.txt.search(/передал вам письмо/i) > -1) {
			msg.txt = msg.txt.replace(msg.txt.split('передал')[0].trim(), function(name) {
				return createHTMLPersLink(name);
			});
		}
		if(msg.txt.search('Защищайтесь!') > -1) {
			msg.txt = msg.txt.replace(msg.txt.split('напал')[1].split('и,')[0].trim(), function(name) {
				return createHTMLPersLink(name);
			});
		}
		if(msg.txt.search('забрал у вас') > -1) {
			var n = msg.txt.split('Проклятый')[1].split('забрал')[0].trim();
			if(n == "монстр") return;
			msg.txt = msg.txt.replace(n, function(name) {
				return createHTMLPersLink(name);
			});
		}
	}
	return msg;
}

ffAddOnLoad(function() {
	var mf = document.getElementById('MasterFrameset');
	if(mf) {
		mf.style.borderColor = 'black';
		mf.setAttribute('frameborder', 1);
		document.getElementsByName('cht')[0].setAttribute('cols', '*, 250px');
	}

	//We HAVE to fix some functions
	if(window.addprcpt) {
		window.add_private = window.addprcpt;
		window.addprcpt = function(nick) {
			var enick = nick.replace(/\u00A0/g, " ");
			add_private(enick);
		};
	}

	if(window.addrcpt) {
		window.add_public = window.addrcpt;
		window.addrcpt = function(nick) {
			var enick = nick.replace(/\u00A0/g, " ");
			add_public(enick);
		};
	}

	if(window.RetrieveData) {
		var str = String(window.RetrieveData);
		str = str.replace(/if \(cmd\.soundUrl\)/,"if (cmd.soundUrl) {getTop().window.play_sound(cmd.soundUrl);} else if(false) ");
		eval("window.RetrieveData = " + str);
	}
});
