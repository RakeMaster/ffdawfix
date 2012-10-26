ffAddOnLoad(function() {
	var mlist = document.getElementById('pnlMsgList');
	if(!mlist){return;}
	var tds = mlist.getElementsByTagName('td');

	for(i=4;i<tds.length;i=i+3){
		var name = tds[i].textContent.substring(0,tds[i].textContent.indexOf(':')).replace("От","").trim();
		if(name!="" && name!="Письмо гласит" && name.search("Вам выдано")==-1){
			tds[i].innerHTML=tds[i].textContent.replace(name,'<a target="_blank" href='+createPersLinkWithText(name)+'>'+name+'</a><img src="resource://ffdawfix/img/reply.gif">');
		}
	}
	var imgs = document.getElementsByTagName('img');
	for(i=0;i<tds.length;i++){
		if(!imgs[i]){return;}
		imgs[i].style.paddingLeft="3px";
		imgs[i].style.cursor="pointer";
		imgs[i].alt="";
		imgs[i].title="Приватное сообщение";
		imgs[i].onclick=function(){
			window.location="/vr/Menus/Friends.aspx?__EVENTTARGET=ebtSendMsg&__EVENTARGUMENT="+this.previousSibling.textContent;
		}
	}

});