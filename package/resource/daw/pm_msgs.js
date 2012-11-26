function openMessagesWithNick(e){
	window.location="/vr/Menus/Friends.aspx?__EVENTTARGET=ebtSendMsg&__EVENTARGUMENT="+e.target.previousSibling.textContent;
}

ffAddOnLoad(function(){
	injectTag("td",function(node){
		if(node && node.textContent.indexOf('От')>-1){
			var name = trim(node.textContent.substring(0,node.textContent.indexOf(':')).replace("От",""));
			if(name=="") return;
			if(name.indexOf('Сообщения')>-1) return;
			node.innerHTML = node.innerHTML.replace(name,'<a target="_blank" href='+createPersLinkWithText(name)+'>'+name+'</a><img alt="" onclick="openMessagesWithNick(event)" style="cursor:pointer; padding-left:3px;" title="Приватное сообщение" src="resource://ffdawfix/img/reply.gif">');
		}
	});
});