function fixFilter() {
	var t = new Array("Все", "Мне", "Прив", "Выкл");
	var f = document.getElementsByTagName('option');
	for(i in t) {
		if(f[i].parentNode.id == "cbFilter") {
			f[i].innerHTML = t[i];
		}
	}
}

function replaceCheckbox() {
	var imgprefix = "resource://ffdawfix/img/";
	cb = document.getElementById('cbSound');
	cb.style.display = "none";

	var cbLabel = cb.nextSibling.nextSibling;
	cbLabel.textContent = "";
	var note = document.createElement('img');
	note.title = "Звук";
	note.id = "note";
	note.style.cursor = "pointer";
	note.src = "";
	note.onclick = function() {
		cb.click();
		note.src = ((cb.checked) ? imgprefix + "note_ch.png" : imgprefix + "note_unch.png");
	}
	cbLabel.parentNode.appendChild(note);
	cbLabel.parentNode.appendChild(document.createTextNode(" | "));
}

function addChatMenu() {
	var c = document.getElementById('Inp');
	c.style.width = "99.5%";

	var ctouter = document.getElementById('ctOuter');
	ctouter.style.whiteSpace = "nowrap";

	var e = document.createElement('td');
	e.setAttribute('nowrap', '');
	e.innerHTML = '<select id="chatmenu" title="Меню" style="width:37px;margin-right:3px;" onchange="this.selectedIndex=0;">'
		+ '<option selected="selected" style="display:none;">М</option>'
		+ '<option class="msg" onclick="getTop().addprcpt(\'Соратники\')">Соратники</option>'
		+ '<option class="msg" onclick="getTop().addprcpt(\'Противники\')">Противники</option>'
		+ '<option class="msg" onclick="getTop().addprcpt(\'Соратники\');getTop().addprcpt(\'Противники\')">Соратники+Противники</option>'
		+ '<option id="clanOption" style="display:none;" onclick="getTop().addprcpt(\'клан\')">Клан</option>'
		+ '<option class="smile" style="border-top:1px dotted grey;" onclick="document.getElementById(\'btSmiles\').click();">Смайлики</option>'
		+ '<option class="del" onclick="document.getElementById(\'btClearTop\').click();">Стереть текст сообщений</option>'
		+ '<option class="del" onclick="document.getElementById(\'btClearBottom\').click();">Стереть строку ввода</option>'
		+ '<option class="translit" onclick="document.getElementById(\'btTranslit\').click();">Транслит</option>'
		+ '</select>';
	ctouter.parentNode.insertBefore(e,ctouter);
}

function hideButons() {
	injectTag('img', function(node) {
		if(node.src.search('/vr/uimg/') > -1) {
			node.style.display = "none";
		}
	});
}

function addClanOption() {
	var clanIcon = getTop().getClanIcon();
	if(!clanIcon) return;
	var clanOpt = document.getElementById('clanOption');
	clanOpt.style.display = "";
	clanOpt.style.backgroundImage = "url(" + clanIcon + ")";
}

function getServerTime() {
	var dte = new Date();
	dte.setTime(dte.getTime() - top.clockCorrection);
	var h = dte.getHours();
	var m = dte.getMinutes();
	var s = dte.getSeconds();
	if (m <= 9) m = '0' + m;
	if (s <= 9) s = '0' + s;
	var time = h + ':' + m + ':' + s;
	return time;
}

function addClock() {
	var a = document.createElement('span');
	a.id = "clock";
	a.style.fontWeight = "bold";
	a.style.textShadow = "0px 0px 1px white";
	a.innerHTML = "";
	document.getElementById('cbSound').parentNode.appendChild(a);
	setInterval(function() {
		document.getElementById('clock').innerHTML = getServerTime();
	}, 1000);
}

ffAddOnLoad(function() {
	document.body.style.background = "url(/vr/uimg/pbg.jpg)";
	document.body.style.margin = "0px";

	var t = document.getElementById('tblMain');
	if(!t) return;
	t.getElementsByTagName('td')[0].style.width = "100%";

	var inp = document.getElementById('Inp');
	var a = document.createElement('img');
	a.src = "resource://ffdawfix/img/enter.png";
	a.style.position = "relative";
	a.style.left = "-22px";
	a.style.top = "3px";
	a.onmouseover = function() this.style.opacity = '1';
	a.onmouseout = function() this.style.opacity = '0.3';
	a.style.opacity = '0.3';
	a.onclick = function() document.getElementById('InpImg').click();
	a.style.cursor = "pointer";
	inp.parentNode.appendChild(a);

	fixFilter();
	replaceCheckbox();
	addChatMenu();
	hideButons();
	addClanOption();
	addClock();
});
