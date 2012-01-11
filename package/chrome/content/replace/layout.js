ru.dclan.ffdawfix.replacers.layout = {
	check: function(url) {
		return url.search("http://darkagesworld.com/vr/layout.aspx") == 0;
	},
	replace: function(text) {
		text = text.replace( /frame id="chouter"/, 'frame name="chouter" id="chouter"');
		return text;
	}
};
