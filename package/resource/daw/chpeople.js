var updateRoomHandlers = new Array();

function addUpdateRoomHandler(handler) {
	updateRoomHandlers[updateRoomHandlers.length] = handler; 
}

function fireUpdateRoomHandlers() {
	for(var i in updateRoomHandlers) {
		updateRoomHandlers[i]();
	}
}

function setClanIcon() {
	injectTag('div', function(node) {
		var clanIcon = node.getElementsByTagName('img')[1];
		if(clanIcon && clanIcon.src.search('/vr/clans') > -1 && !node.getElementsByTagName('img')[0].className) {
			if(getTop().chatFrameLoaded) {
				var clanOpt = getTop().frames['ChInp'].document.getElementById('clanOption');
				clanOpt.style.display = "";
				clanOpt.style.backgroundImage = "url(" + clanIcon.src + ")";
			}
			getTop().getClanIcon = clanIcon;
		}
		else {
			getTop().getClanIcon = null;
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
	addUpdateRoomHandler(setClanIcon);
});