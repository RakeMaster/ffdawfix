var persName = null;

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
	msg.txt = msg.txt.replace(/<img/g, '<img style="cursor:pointer;" onclick="top.smile(this.src.replace(\'.gif\',\'\').replace(\'http:\/\/darkagesworld\.com\/vr\/smiles\/\',\'\'))"');
	if(msg.isSystem) {
		if(msg.txt.indexOf('зашел в Смутные Времена') > -1) {	
			msg.txt = msg.txt.replace(' зашел в Смутные Времена','').replace(/.+/,function(f){return "<a target='_blank' href='" + createPersLinkWithText(f) + "'>" + f + "</a> ";}) + "зашел в Смутные Времена";
		}
		if(msg.txt.indexOf('зашла в Смутные Времена') > -1) {	
			msg.txt = msg.txt.replace(' зашла в Смутные Времена','').replace(/.+/,function(f){return "<a target='_blank' href='" + createPersLinkWithText(f) + "'>" + f + "</a> ";}) + "зашла в Смутные Времена";
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
