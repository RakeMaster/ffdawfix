ru.dclan.ffdawfix.replace.observer.add(
	function(url) {
		return url.search("http://darkagesworld.com/vr/layout.aspx") == 0;
	}
	,
	function(text) {
		text = text.replace( /frame id="chouter"/, 'frame name="chouter" id="chouter"');
		return text;
	}
);
