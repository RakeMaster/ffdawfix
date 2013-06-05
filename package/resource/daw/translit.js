function transliterate(msg) {
	for (i=0;i<lit_eng.length;i++) {
		msg = msg.replace(lit_eng[i], lit_rus[i]);
	} 
	return msg;
}

ffAddOnLoad(function() {
	document.getElementById('btTranslit').onclick = function() {
		var inp = document.getElementById('Inp');
		var message = inp.value;
		var reg = message.split(/\u005B[^\u005D]*\u005D|\u007B[^\u007D]*\u007D/).pop();
		reg = new RegExp(reg + "\$");
		var str = message.replace(reg,function (a){return transliterate(a)});
		inp.value = str;
		inp.focus();
	}
});
