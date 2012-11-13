ffAddOnLoad(function() {
	var mlist = document.getElementById('pnlMsgList');
	if(!mlist) return;
	var tds = mlist.getElementsByTagName('td');

	for(i=4;i<tds.length;i=i+3){
		var name = trim(tds[i].textContent.substring(0,tds[i].textContent.indexOf(':')).replace("От",""));
		if(name!="" && name!="Письмо гласит" && name.indexOf("Вам выдано")==-1){
			tds[i].innerHTML=tds[i].textContent.replace(name,'<a target="_blank" href='+createPersLinkWithText(name)+'>'+name+'</a><img alt="" onclick="window.location=showMsgMenu()" style="cursor:pointer; padding-left:3px;" title="Приватное сообщение" src="resource://ffdawfix/img/reply.gif">');
		}
	}
		injectTag("img",function(node) {
			if(node){
			node.setAttribute('onclick','window.location="/vr/Menus/Friends.aspx?__EVENTTARGET=ebtSendMsg&__EVENTARGUMENT="+this.previousSibling.textContent');
			}
	});
});