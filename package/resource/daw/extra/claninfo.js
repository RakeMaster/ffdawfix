function countAll(cnt){
	cnt = document.getElementById('Table10').getElementsByTagName('img').length;
	return cnt;
}

function countOffline(){
	var tds = document.getElementById('Table10').getElementsByTagName('tr');
	var c = -1;
	for(i=0;i<tds.length;++i){
		if(tds[i].textContent.search('вне Смутных Времен')>-1){
			++c;
		}
	}
	return c;
}

function countOnline(cnt){
	cnt = countAll()-countOffline();
	return cnt;
}

function getMaxClanPlayerCount() {
	return 80;
}

function countFreeSpaces(cnt){
	cnt = getMaxClanPlayerCount()-countAll();
	return cnt;
}

ffAddOnLoad(function(){
	var table = document.getElementById('Table10');
	if(!table) return;
	var s = document.createElement('span');
	s.innerHTML="<b>Количество игроков:</b> "+countAll()+"<br>"+"<b>Онлайн: </b>"+countOnline()+"<br>"+"<b>Оффлайн: </b>"+countOffline()+"<br>"+"<b>Свободных мест: </b>"+countFreeSpaces();
	s.style.position="absolute";
	s.style.top="15px";
	s.style.right="0px";
	document.body.appendChild(s);
});