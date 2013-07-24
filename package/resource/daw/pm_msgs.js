function openMessagesWithNick(nick) {
	window.location = "/vr/Menus/Friends.aspx?__EVENTTARGET=ebtSendMsg&__EVENTARGUMENT=" + encodeURIComponent(nick) + "#msgs";
}

ffAddOnLoad(function() {
	injectTag("td", function(node) {
		if(node.textContent.indexOf('От') > -1) {
			if(node.className == "SubHeader") return;
			var name = trim(node.textContent.split(':')[0].replace('От', ''));
			if(name == "") return;
			var rep = '<img style="cursor:pointer;" src="resource://ffdawfix/img/reply.gif" alt="" title="Ответить" onclick="openMessagesWithNick(this.previousSibling.textContent)">';
			node.innerHTML = node.innerHTML.replace(name, createHTMLPersLink(name) + rep);
		}
	});
});
