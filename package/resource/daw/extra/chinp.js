function fixFilter() {
	var t = new Array("Все", "Мне", "Прив", "Выкл");
	var f = document.getElementsByTagName('option');
	for(i=0;i<f.length;i++) {
		if(f[i].parentNode.id == "cbFilter") {
			f[i].innerHTML = t[i];
		}
	}
}

function fixCheckbox() {
	var cb = document.getElementById('cbSound');
	cb.title = "Звук";
	var cbLabel = cb.nextSibling.nextSibling;
	cbLabel.parentNode.removeChild(cbLabel);
}

function addChatMenu() {
	var c = document.getElementById('Inp');
	c.style.width = "99%";
	
	var ctouter = document.getElementById('ctOuter');
	ctouter.style.whiteSpace = "nowrap";
	
	var e = document.createElement('td');
	e.setAttribute('nowrap', '');
	e.innerHTML = '<select id="chatmenu" title="Меню" style="width:35px;margin-right:3px;" onchange="this.selectedIndex=0;">'
		+ '<option selected="selected" style="display:none;">М</option>'
		+ '<option class="msg" onclick="getTop().addprcpt(\'Соратники\')">Соратники</option>'
		+ '<option class="msg" onclick="getTop().addprcpt(\'Противники\')">Противники</option>'
		+ '<option class="msg" onclick="getTop().addprcpt(\'Соратники\');getTop().addprcpt(\'Противники\')">Соратники+Противники</option>'
		+ '<option class="msg" style="border-bottom:1px dotted black;" onclick="getTop().addprcpt(\'клан\')">Клан</option>'
		+ '<option class="smile" onclick="document.getElementById(\'btSmiles\').click();">Смайлики</option>'
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

ffAddOnLoad(function() {
	var t = document.getElementById('tblMain');
	t.getElementsByTagName('td')[0].style.width = "100%";
	
	fixFilter();
	fixCheckbox();
	addChatMenu();
	hideButons();
	doResize();
});
