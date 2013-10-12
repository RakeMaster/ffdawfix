function transliterate(msg) {
	for (i in lit_eng) {
		msg = msg.replace(lit_eng[i], lit_rus[i]);
	} 
	return msg;
}

function toggleEncoding(txt) {
    var letters = "?,/.аfб,вdгuдlеtё`ж;зpиbйqкrлkмvнyоjпgрhсcтnуeфaх[цwчxшiщoъ]ыsьmэ'ю.яz" +
                 "АFБ<ВDГUДLЕTЁ~Ж:ЗPИBЙQКRЛKМVНYОJПGРHСCТNУEФAХ{ЦWЧXШIЩOЪ}ЫSЬMЭ\"Ю>ЯZ";
	var reg = new RegExp('[' + letters.replace(/([\[\]\?])/g, '\\$1') + ']', 'gi')
    return txt.replace(reg, function(letter) {
        var index = letters.indexOf(letter);
        if (index >= 0) {
            return letters[index & 1 ? index - 1 : index + 1];
        }
        return letter;
    });
}

ffAddOnLoad(function() {
	var inp = document.getElementById('Inp');

	inp.onkeydown = function(event) {
		if(event.altKey) {
			var msgtxt = inp.value.split(/(\})|(\])/).pop().trim();
			var nicks = inp.value.replace(msgtxt, "");
			if(event.keyCode == 82) {
				inp.value = nicks + toggleEncoding(msgtxt);
				return false;
			}
			//Alt + R
			if(event.keyCode == 84) {
				inp.value = nicks + transliterate(msgtxt);
				return false;
			}
			// Alt + T
		}
	}
	// HotKeys

	document.getElementById('btTranslit').onclick = function() {
		var msgtxt = inp.value.split(/(\})|(\])/).pop().trim();
		var nicks = inp.value.replace(msgtxt, "");
		inp.value = nicks + transliterate(msgtxt);
		inp.focus();
	}
});
