function fixRingLink(node) {
	if(node.src.search("menwr")==-1) return;
	var txt = node.title;
	if(!txt)return;
	var regex = /[^\s]+[\s]([^\.]+)\./;
	var m = regex.exec(txt);
	if(!m)return;
	var p = node.parentNode;
	if(p.tagName.toLowerCase()!="a")return;
	p.href=getPersLink(m[1]);
}

function fixGiftLink(node) {
	if(node.src.search("gift") == -1) return;
	var txt = node.title; 
	if(!txt) return;
	var regex = /[^\s]+[\s]([^\.]+)/;
	var m = regex.exec(txt);
	if(!m) return;
	var p = node.parentNode;
	if(p.tagName.toLowerCase()!="span")return;
	var a = createPersLink(m[1]);
	a.innerHTML = p.innerHTML;
	a.style.textDecoration = "none";
	p.parentNode.replaceChild(a, p);
}

ffAddOnLoad(function() {
	injectTag("img", function(node) {
		if(ffdawfix.prefs.ringsFix) fixRingLink(node);
		if(ffdawfix.prefs.giftsFix) fixGiftLink(node);
	});

	injectTag("strong", function(node) {
		node.innerHTML=node.innerHTML+"&nbsp;";
	});

});