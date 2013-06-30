function transliterate(msg) {
	for (i=0;i<lit_eng.length;i++) {
		msg = msg.replace(lit_eng[i], lit_rus[i]);
	} 
	return msg;
}

ffAddOnLoad(function() {
	document.getElementById('btTranslit').onclick = function() {
		var inp = document.getElementById('Inp');
		var msgtxt = inp.value.split(/(\})|(\])/).pop().trim();
		var nicks = inp.value.replace(msgtxt, "");
		inp.value = nicks + transliterate(msgtxt);
	}
});
