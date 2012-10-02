ffAddOnLoad(function() {
var mlist = document.getElementById('pnlMsgList');
if(!mlist){return;}
var tds = mlist.getElementsByTagName('td');

for(i=4;i<tds.length;i=i+3){
var name = tds[i].textContent.substring(0,tds[i].textContent.indexOf(':')).replace("От","").trim();
if(name!=""){
tds[i].innerHTML=tds[i].textContent.replace(name,'<a target="_blank" href='+createPersLinkWithText(name)+'>'+name+'</a><img src="resource://ffdawfix/img/reply.gif">');
}
}

for(x=0;x<tds.length;x++){
var imgs = document.getElementsByTagName('img');
if(!imgs[x]){return;}
imgs[x].style.paddingLeft="3px";
imgs[x].style.cursor="pointer";
imgs[x].title="Приватное сообщение";
imgs[x].onclick=function(){
window.location="http://darkagesworld.com/vr/Menus/Friends.aspx?__EVENTTARGET=ebtSendMsg&__EVENTARGUMENT="+this.previousSibling.textContent;
}
}

});