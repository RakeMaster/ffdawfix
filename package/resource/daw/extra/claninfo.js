function countAll(){
	var imgs = document.getElementById('Table10').getElementsByTagName('img');
	for(i=0,c=0;i<imgs.length;++i){
		if(imgs[i].src.indexOf('Info.gif')>0){
			++c;
		}
	}
return c;
}

function countOffline(){
	var tds = document.getElementById('Table10').getElementsByTagName('tr');
	for(i=0,c=-1;i<tds.length;++i){
		if(tds[i].textContent.indexOf('вне Смутных Времен')>-1){
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
	s.innerHTML="<b style='color:green;'>Онлайн: </b>"+countOnline()+"/"+countAll()+"<br>"+"<b>Количество вакансий: </b>"+countFreeSpaces();
	s.style.position="absolute";
	s.style.top="15px";
	s.style.right="0px";
	document.body.appendChild(s);
});
