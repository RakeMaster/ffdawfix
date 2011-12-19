ru.dclan.ffdawfix.replace.observer.add(
	function(url) {
		return url.search("http://darkagesworld.com/vr/common/clock.js") == 0;
	}
	,
	function(text) {
		text = text.replace( /timespan\./, 'document.getElementById("timespan").');
		return text;
	}
);
