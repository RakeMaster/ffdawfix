function fixImageMag(node) {
	if(node.title) return;
	var txt = node.src;
	var regex = /voc([1-6])sm/;
	var match = regex.exec(txt);
	if(!match) return;
	var n = parseInt(match[1]);
	var name;
	switch(n) {
	//TODO: remove hardcode
	case 1: name = "Равновесиe"; break;
	case 2: name = "Порядок"; break;
	case 3: name = "Разум"; break;
	case 4: name = "Хаос"; break;
	case 5: name = "Чувства"; break;
	case 6: name = "Природа"; break;
	}
	node.title = "Склонность: " + name;
}

function createLinks() {
	injectTag("span",function(node) {
		if(node.id=="lbName") {
			var cur = node.getElementsByTagName("b")[0];
		}
		if(cur) {
			var nick = cur.textContent;
			var e = createPersLinkWithText(nick);
			cur.innerHTML = "";
			cur.appendChild(e);
		}
	});

}

function injectBattlePlayerNode(node, enemy) {
	//Its not the node we need. It is a link
	if(node.parentNode.tagName.toLowerCase() == "a") return false;
	//Its not what we need. It is probably damage info
	var regex = /[\-\+\%]/;
	if(regex.exec(node.textContent)) return false;

	var d = node.getAttribute('datafld');
	if(!enemy || !d) {
		if(ffdawfix.prefs.battleLinks) {
			var a = createPersLink(node.textContent);
			var i = document.createElement(node.tagName);
			i.className = node.className;
			i.innerHTML = node.innerHTML;
			if(d) {
				i.setAttribute('datafld', d);
			}
			a.appendChild(i);
			node.parentNode.replaceChild(a,node);
		}
		return false;
	}
	return d;
}

function createHealthNode(cl) {
	var fc = getClassFirst(cl);
	var d = fc.getAttribute('datafld');
	if(!d) return null;
	if(fc) {
		var txt = fc.parentNode.textContent;
		var regex = /\[(\d+)\/(\d+)\]/g;
		var r;
		var l = 0;
		var h = 0;
		while(r = regex.exec(txt)) {
			l += parseInt(r[1]);
			h += parseInt(r[2]);
		}
		if(l > 0) {
			var info = document.createElement("span");
			info.textContent = " [" + l + "]";
			info.setAttribute("health", l);
			return info;
		}
	}
	return null;
}

function fixBattleGroups() {
	if(window.EnemySelect) {
		window.fixedEnemySelect = function(id) {
			if (id) {
				document.getElementById('NewEnemyId').value = id;
				btSetEnemy.click();
			}
		}
	}
	var friendNode = null;
	var enemyNode = null;
	injectTag("td", function(node) {
		var bg = node.getAttribute("background");
		if( bg && bg == "/vr/uimg/whc.gif") {
			var txt = node.textContent;
			if(txt.search("Соратники") != -1) {
				friendNode = node;
			}
			if(txt.search("Противники") != -1) {
				enemyNode = node;
			}
		}
	});

	if(!friendNode && !enemyNode) {
		injectClass("BG0", function(node) {
			injectBattlePlayerNode(node, false);
		});
		injectClass("BG1", function(node) {
			injectBattlePlayerNode(node, false);
		});
		return;
	}

	var italic_count = 0;
	var iter = friendNode;

	while(iter && !(iter.className == "sh3" && iter.tagName.toLowerCase() == "tr")) {
		iter = iter.parentNode;
	}

	if(!iter) return;
	var tmp = iter.textContent;
	var enemyClass = "BG1";
	var friendClass = "BG0";
	if(tmp.search("Соратники") > tmp.search("Противники")) {
		enemyClass = "BG0";
		friendClass = "BG1";
	}
	//Calculate health
	var fh = null;
	var eh = null;
	var diff = null;
	if(ffdawfix.prefs.battleHealth) {
		fh = createHealthNode(friendClass);
		eh = createHealthNode(enemyClass);
		if(fh && eh) {
			var fv = parseInt(fh.getAttribute("health"));
			var ev = parseInt(eh.getAttribute("health"));
			var d = fv-ev;
			if(d != 0) {
				diff = document.createElement("span");
				diff.style.color = ((d > 0)?"green":"red");
				if(d > 0) d = "+" + d;
				diff.textContent = d;
			}
		}
	}

	injectClass(friendClass, function(node) {
		injectBattlePlayerNode(node, false);
	});

	injectClass(enemyClass, function(node) {
		var d = injectBattlePlayerNode(node, true);
		if(!d) return;

		if(node.innerHTML.search("<i>") != -1) {
			italic_count++;
		}
		var code = "node.onclick=function() {fixedEnemySelect('" + d + "');};";
		eval(code);
	});

	{
		var a = document.createElement("span");
		a.style.cursor = "pointer";
		a.style.textDecoration ="underline";
		a.onclick = function() { getTop().addprcpt("Соратники"); };
		a.textContent = "Соратники";
		friendNode.textContent = "";
		friendNode.appendChild(a);
		if(fh) friendNode.appendChild(fh);
		if(diff) friendNode.appendChild(diff);
	}
	{
		var a = document.createElement("span");
		a.style.cursor = "pointer";
		a.style.textDecoration ="underline";
		a.onclick = function() { getTop().addprcpt("Противники"); };
		a.textContent = "Противники";
		enemyNode.textContent = "";
		enemyNode.appendChild(a);
		if(eh) enemyNode.appendChild(eh);
		if(ffdawfix.prefs.battleCounter) {
			var info = document.createElement("span");
			if(italic_count) {
				info.textContent = " (Ударов: " + italic_count + ")";
			}else {
				info.textContent = " (УДАРОВ НЕ СТОИТ)";
				info.style.color = "red";
			}
			enemyNode.appendChild(info);
		}
	}
	return true;
}

function checkPoint(id) {
	var e = document.getElementById(id);
	if(!e) return 0;
	return e.checked?1:0;
}

function setCheck(id) {
	var e = document.getElementById(id);
	if(e) document.getElementById(id).onclick = function() {
		SetAttackType();
		var c = GetDefencePointsCount();
		var ex = document.getElementById("lbExplain");
		if(ex) {
			ex.style.color  = ((c > 2)?"red":"blue");
		}
	}
}

function setAttackPointImages() {
	prefix = "resource://ffdawfix/img/";
	injectTag('input', function(node) {
		if(node.type == "radio" || node.type == "checkbox") {
			var img = node.parentNode.getElementsByTagName('img')[0];
			if(node.checked) {
				img.src = ((node.type == "radio") ? prefix + "r_ch.png" : prefix + "cb_ch.png");
			}
			else {
				img.src = ((node.type == "radio") ? prefix + "r_unch.png" : prefix + "cb_unch.png");
			}
		}
	});
}

ffAddOnLoad(function() {
	if(getTop().hidePopupMenu) {
		getTop().hidePopupMenu();
	}
	injectTag("td", function(node) {
		if(node.onclick && String(node.onclick).search("EnemySelect")!=-1) {
			node.onclick = null;
		}
	});

	injectTag('input', function(node) {
		if(node.type == "checkbox" || node.type == "radio") {
			var a = document.createElement('img');
			a.src = "";
			a.style.marginRight = "3px";
			a.onclick = function() {
				var r = this.parentNode.getElementsByTagName('input')[0];
				r.checked = !r.checked;
				setAttackPointImages();
			}
			node.style.display = "none";
			node.parentNode.onclick = function() setAttackPointImages();
			node.parentNode.insertBefore(a, node);
		}
	});

	setAttackPointImages();
	fixBattleGroups();

	injectTag("img", function(node) {
		if(ffdawfix.prefs.battleSmall && node.src.toLowerCase().search("avatar") != -1) {
			var x = 149;
			var y = 230;
			var k = 2 / 3;
			node.style.width = Math.round(x * k) + "px";
			node.style.height = Math.round(y * k) + "px";
		}
		if(node.src.toLowerCase().search("/vr/images/pvt.gif") != -1) {
			var a = node.parentNode;
			var td = a.parentNode;
			var ptd = td.nextSibling;
			while(!ptd.tagName || ptd.tagName.toLowerCase() != "td") {
				ptd = ptd.nextSibling;
			}
			var txt = ptd.textContent;
			var regexp = /(\d+)/;
			var r = regexp.exec(txt);
			ptd.textContent = r[1]+"%";
			var tr = td.parentNode;
			tr.removeChild(td);
		} else {
			fixImageMag(node);
		}
	});

	if(window.GetDefencePointsCount) {
		window.GetDefencePointsCount = function () {
			var s = 0;
			for(var i=  0; i < 4; ++i) {
				s += checkPoint("cblDefence_" + i);
			}
			return s;
		}
	}
	for(var i = 0;i < 4; ++i) {
		setCheck("cblDefence_" + i);
	}
	if(ffdawfix.prefs.battleSound) {
		if(getTop().mainFrmLoc != null) {
			getTop().play_sound('/vr/sounds/pvtmsg.wav');
			getTop().mainFrmLoc = null;
		}
	}

	SetAttackType();
	createLinks();
});
