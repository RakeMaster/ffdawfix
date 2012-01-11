ru.dclan.ffdawfix.replacers.smiles = {
	check: function(url) {
		return url.search("http://darkagesworld.com/vr/smiles/smiles") == 0;
	},
	replace: function(text) {
		text = text.replace( /dialogArguments/g, 'opener.top');
		return text;
	}
};