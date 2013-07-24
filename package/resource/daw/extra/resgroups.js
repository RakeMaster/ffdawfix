function countAll() {
	var cnt = 0;
	var l = document.getElementById('Table1');
	if(!l) return;
	var tds = l.getElementsByTagName('td');
	if(!l) return;
	for(i=0;i<tds.length;i++) {
		var txt = tds[i].textContent.trim();
		if(!isNaN(txt) && txt != "") {
			cnt++;
		}
	}
	return cnt;
}

function countRes(kind) {
	var len = 0;
	switch (kind) {
		case 'herb': arr = ['Подорожник', 'Пустырник', 'Зверобой', 'Мать-и-мачеха', 'Чистотел', 'Мята', 'Чертополох', 'Тысячелистник', 'Женьшень', 'Трын-трава'];
			break;
		case 'ore': arr = ['Железо', 'Сера', 'Медь', 'Слюда', 'Свинец',
			'Олово', 'Алмазы', 'Сапфиры', 'Изумруды', 'Рубины'];
			break;
		case 'wood': arr = ['Бук', 'Дуб', 'Береза', 'Ель', 'Красное дерево'];
			break;
		case 'fish': arr = ['Ерш', 'Плотва', 'Карась', 'Карп', 'Щука',
			'Сом', 'Осетр'];
			break;
		case 'skin': arr = ['Шкура Зверожаба', 'Шкура Клювозуба', 'Шкура Гро', 'Шкура Шишиги', 
			'Шкура Лорда Зверожаба', 'Шкура Клювоклыка','Шкура Большого Гро','Шкура Морены'];
			break;
	};
	for(i in arr) {
		injectTag('a', function(node) {
			if(node.textContent.trim() == arr[i]) { 
				len++;
			}
		});
	};
	return len;
}

function addGroups() {
	var a = document.getElementById('lbTotalWeight');
	if(!a) return;
	var e = document.createElement('span');
	e.id = "resgroups"
	e.innerHTML = "<br>"
		+ "<a style='margin-right:5px;' href='/vr/Menus/BackPack.aspx?BackPackState=Res#all'>Всё"
			+ "<i>("
			+ countAll()
			+ ")</i>"
		+ "</a>"
		+ "<a onclick='selectTab(this)' href='/Vr/Menus/BackPack.aspx?BackPackState=Res#ore'>Руда"
			+ "<i>("
			+ countRes('ore')
			+ ")</i>"
		+ "</a>"
		+ "<a style='margin:0px 5px' href='/VR/Menus/BackPack.aspx?BackPackState=Res#wood'>Дерево" 
			+ "<i>(" 
			+ countRes('wood')
			+ ")</i>" 
		+ "</a>"
		+ "<a href='/vR/Menus/BackPack.aspx?BackPackState=Res#herb'>Трава"
			+ "<i>(" 
			+ countRes('herb')
			+ ")</i>" 
		+ "</a>"
		+ "<a style='margin:0px 5px' href='/vr/menus/BackPack.aspx?BackPackState=Res#fish'>Рыба"
			+ "<i>(" 
			+ countRes('fish')
			+ ")</i>"
		+ "</a>"
		+ "<a href='/vr/menUs/BackPack.aspx?BackPackState=Res#skin'>Добыча"
			+ "<i>(" 
			+ countRes('skin')
			+ ")</i>" 
		+ "</a>"
		+ "</div>";
	a.appendChild(e);
}

function selectTab() {
	var a = document.getElementById('resgroups').getElementsByTagName('a');
	if(checkAnchor() == "") {
		a[0].style.fontWeight = "bold";
	}
	else {
		for(i=0;i<a.length;i++) {
			if(a[i].href.split('#')[1] == checkAnchor()) {
				a[i].style.fontWeight = "bold";
				break;
			}
		}
	}
}

ffAddOnLoad(function() {
	var a = document.getElementById('lbTotalWeight');
	if(!a || document.getElementById('lbRes').style.fontWeight != "bold") return;
	addGroups();
	selectTab();

	if(checkAnchor() != "") {
		countRes(checkAnchor());
		var form = document.getElementById('BackPack');
		if(!form) return;
		form.action = "/vr/Menus/BackPack.aspx#" + checkAnchor();
	}

	var a = document.getElementById('Table1');
	if(!a) return;
	var l = a.getElementsByTagName('a');
	for(i=0;i<l.length;i++) {
		if(checkAnchor() != "" && checkAnchor() != "all" && arr.join('').search(l[i].textContent) == -1) {
			l[i].parentNode.parentNode.parentNode.style.display = "none";
		}
	}
});
