ru.dclan.ffdawfix.replace.observer.add(
		function(url) {
			return url.search("http://darkagesworld.com/vr/smiles/smiles") == 0;
		}
		,
		function(text) {
			text = text.replace( /dialogArguments/g, 'opener.top');
			return text;
		}
	);
