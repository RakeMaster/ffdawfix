ru.dclan.ffdawfix.replace.observer.add(
	function(url) {
		return url.search("http://darkagesworld.com/vr/scripts/layout5.js") == 0;
	}
	,
	function(text) {
		text = text.replace( /\.document;/g, '.window;');
		return text;
	}
);
