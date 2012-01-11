ru.dclan.ffdawfix.replacers.layout5 = {
	check: function(url) {
		return url.search("http://darkagesworld.com/vr/scripts/layout5.js") == 0;
	},
	replace: function(text) {
		text = text.replace( /\.document;/g, '.window;');
		return text;
	}
};
