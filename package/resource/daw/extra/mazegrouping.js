function drop(obj) {
	obj = obj.split(':')[0].trim();
	injectTag('a', function(node) {
		var parent = node.parentNode;
		if(!parent) return;
		var parent2 = parent.parentNode;
		if(!parent) return;
		var stuff = parent2.getElementsByTagName('td')[0];
		if(!stuff) return;
		var stufftxt = stuff.textContent.trim();
		if(stufftxt == obj) eval(node.href);
	});
}

ffAddOnLoad(function() {
	txt = "";
	var t = document.getElementsByTagName('table')[0];
	if(!t) return;

	injectTag('tr', function(node) {
		if(node.innerHTML.search('Деньги') == -1) node.style.display = "none";
	});

	var a = t.getElementsByTagName("td");
	obj = {};
	for (var b = 0; b < a.length; b++) {
		var c = a[b].firstChild.textContent.trim();
		if(c != "" && !c.match('Выбросить') && !c.match('Деньги')) {
			obj[c] ? obj[c]++ : obj[c] = 1;
		}
	}
	for (var d in obj) {
		txt += "<div>"
			+ "&nbsp;"
			+ d
			+ ": "
			+ obj[d]
			+ "шт."
			+ "&nbsp;"
			+ "<span style='cursor:pointer;' onclick='drop(this.parentNode.firstChild.data);' title='Выбросить'>[&#x2715;]</a></div>";
	};
	var e = document.createElement('span');
	e.innerHTML = txt;
	t.parentNode.appendChild(e);
});
