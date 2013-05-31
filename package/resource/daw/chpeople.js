var updateRoomHandlers = new Array();

function addUpdateRoomHandler(handler) {
	updateRoomHandlers[updateRoomHandlers.length] = handler; 
}

function fireUpdateRoomHandlers() {
	for(var i in updateRoomHandlers) {
		updateRoomHandlers[i]();
	}
}

function setClanObject() {
	injectTag('div', function(node) {
		var clanLogo = node.getElementsByTagName('img')[1];
		if(clanLogo && clanLogo.src.search('/vr/clans') > -1 && !node.getElementsByTagName('img')[0].className) {
			if(getTop().chatFrameLoaded) {
				var clanOpt = getTop().frames['ChInp'].document.getElementById('clanOption');
				clanOpt.style.display = "";
				clanOpt.style.backgroundImage = "url(" + clanLogo.src + ")";
			}
			getTop().getClanObject = clanLogo;
		}
		else {
			getTop().getClanObject = null;
		}
	});
}

ffAddOnLoad(function() {
	var menu_ref = document.getElementById('menu_ref');
	if(menu_ref) {
		var div_rmenu = document.getElementById('div_rmenu');

		var out = menu_ref.onmouseout;
		var over = menu_ref.onmouseover;

		menu_ref.onmouseout  = null;
		menu_ref.onmouseover = null;

		menu_ref.onclick = over;

		div_rmenu.onmouseout  = null;
		div_rmenu.onmouseover = null;
	}

	addUpdateRoomHandler(fixImgTitle);
	if(window.UpdateRoom) {
		var oldS = String(window.UpdateRoom);
		var s = oldS.replace(/\}\s*\}\s*\,/,"}fireUpdateRoomHandlers();},");
		eval("window.UpdateRoom = "+s);
		window.UpdateRoom();
	}
	injectTag("body", function(node) {
		node.style.height = null;
	});
	addUpdateRoomHandler(setClanObject);
});