ru.dclan.ffdawfix.replacers.timespan = {
	check: function(url) {
		return url.search("http://darkagesworld.com/vr/common/clock.js") == 0;
	},
	replace: function(text) {
		text = text.replace( /timespan\./, 'document.getElementById("timespan").');
		return text;
	}
};
