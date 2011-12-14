function fixRooms() {
	var menu_ref = document.getElementById('menu_ref');
	if(!menu_ref) {
		return;
	}
	menu_ref.onclick = null;
	menu_ref.onmouseover = null;
	menu_ref.onmouseout = null;
	var chtRoomName = document.getElementById('chtRoomName').textContent;
	menu_ref.innerHTML = "Комнаты:";
	menu_ref.className = null;
	var name = document.createElement("span");
	name.style.display = "none";
	name.id = "chtRoomName";
	name.textContent = chtRoomName;
	menu_ref.appendChild(name);
	injectClass("mitem",function(node) {
		if(node.parentNode.id != "div_rmenu") return;
		var d = document.createElement('span');
		if(chtRoomName == node.textContent) { //Selected room
			d.style.fontWeight = "bold";
		} else {
			//d.className = node.className;
			d.style.textDecoration = "underline";
			d.style.cursor = "pointer";
			d.onclick = node.onclick; //.replace("top\\.RMenuLnk\\(window, ","ff_selectRoom(");
		}
		d.style.marginLeft = "5px";
		d.textContent = node.textContent[0];//First letter
		d.title = node.textContent;
		menu_ref.appendChild(d);
	});
}

function ff_selectRoom(roomId) {
	GoCRoom(roomId);
}

(function() {
	var menu_ref = document.getElementById('menu_ref');
	if(!menu_ref) return;
	menu_ref.style.position = "relative";
	menu_ref.style.cssFloat = "left";
	menu_ref.style.left = "2px";
	menu_ref.style.backgroundColor = null;
	//Compact
	injectClass("sh2u",function(node) {
		var iconSize = ' width="16px" height="16px"';
		if(node.textContent == "Форум") {
			node.innerHTML = '<img src="resource://ffdawfix/img/forum.gif" border=0 width="15px" height="15px" title="Форум" alt="Ф">'
			return;
		}
		if(node.parentNode.href.search("search")!=-1) {
			node.innerHTML = '<img src="resource://ffdawfix/img/s.gif" border=0'+iconSize+' title="Поиск" alt="П">'
			return;
		}
		if(node.parentNode.href.search("DoRoom")!=-1) {
			node.innerHTML = '<img src="resource://ffdawfix/img/r.gif" border=0'+iconSize+' title="Обновить" alt="О">'
			return;
		}
	});
	injectTag("label",function(node) {
		return "delete";
	});

	injectTag("input",function(node) {
		if(node.name == "arefr") {
			node.title = "Автообновление";
			var p = node;
			while(p && (!p.tagName || p.tagName.toLowerCase()!="br")) {
				p = p.previousSibling;
			}
			p.parentNode.removeChild(p);
		}
	});
	menu_ref.parentNode.style.textAlign = "right";
	var tr = menu_ref.parentNode.parentNode;
	tr = tr.nextSibling;
	while(!tr.tagName) {
		tr = tr.nextSibling;
	}
	tr.parentNode.removeChild(tr);

	//GROUPS
	addUpdateRoomHandler(fixRooms);
	//endof compact
})();