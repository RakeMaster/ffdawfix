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

function ffReplaceMessage(msg) {
	msg = msg.replace(/http:\/\/darkagesworld\.com\/vr\/battle\/BattleLog\.aspx\?id=[a-f\-0-9]+(?:&amp;page=\d+)?/gi, '<a href="$&" target="_blank" style="color:blue;">$&</a>');
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
