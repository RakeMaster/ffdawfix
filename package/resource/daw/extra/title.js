function getFirstTag(e,name) {
	var t = e.getElementsByTagName(name);
	if(!t) {
		return null;
	}
	t = t[0];
	return t;
}

function getPersName() {
	var t = document.getElementById('Table9');
	if(!t) return null;
	t = getFirstTag(t, 'tbody');
	if(!t) return null;
	t = getFirstTag(t, 'tr');
	if(!t) return null;
	t = getFirstTag(t, 'td');
	if(!t) return null;
	var nick = trim(t.textContent);
	if(nick == "") return null;
	return nick;
}

function getPersNameBattle() {
	var t = document.getElementById('lbName');
	if(!t) return null;
	var nick = t.textContent.replace(/^\s*([\S\s]*?)\s*\[\d+\]\s*$/, '$1');
	if(nick == "") return null;
	return nick;
}

ffAddOnLoad(function() {
	var pn = getPersNameBattle();
	if(!pn) {
		pn = getPersName();
	}
	if(pn) {
		top.setPersName(pn);
	}
});
