function countAll() {
	var t = document.getElementById('pnlMembers');
	if(!t) return;
	var m = t.innerHTML.match(/top.addprcpt/g);
	if(m) return m.length;
}

function countOffline() {
	var m = document.body.textContent.match(/вне Смутных Времен/g);
	if(m) return m.length;
}

function countOnline(cnt) {
	cnt = countAll() - countOffline();
	return cnt;
}

function getMaxClanPlayerCount() {
	return 80;
}

function countFreeSpaces(cnt) {
	cnt = getMaxClanPlayerCount() - countAll();
	return cnt;
}

ffAddOnLoad(function() {
	var table = document.getElementById('Table10');
	if(!table) return;
	var s = document.createElement('span');
	s.innerHTML = "<b style='color:green;'>Онлайн: </b>" 
		+ countOnline() 
		+ "/"
		+ countAll() 
		+ "<br>" 
		+ "<b>Количество вакансий: </b>" 
		+ countFreeSpaces();
	s.style.position = "absolute";
	s.style.top = "15px";
	s.style.right = "0px";
	document.body.appendChild(s);
});
