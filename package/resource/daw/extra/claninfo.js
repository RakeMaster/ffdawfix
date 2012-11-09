function countAll(cnt){
	cnt = document.getElementById('Table10').getElementsByTagName('a').length/2;
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

function countFreeSpaces(cnt){
	cnt = 80-countAll();
	return cnt;
}


ffAddOnLoad(function(){
	var s = document.createElement('span');
	s.innerHTML="<b>Количество игроков:</b> "+countAll()+"<br>"+"<b>Онлайн: </b>"+countOnline()+"<br>"+"<b>Оффлайн: </b>"+countOffline()+"<br>"+"<b>Свободных мест: </b>"+countFreeSpaces();
	s.style.position="absolute";
	s.style.top="15px";
	s.style.right="0px";
	document.body.appendChild(s);
});