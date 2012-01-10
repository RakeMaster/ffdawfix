ru.dclan.ffdawfix.replace.observer.add(
	function(url) {
		return url.search("http://darkagesworld.com/vr/menus/citymap.aspx") == 0;
	}
	,
	function(text) {
		text = text.replace( /TOP=(\d+)px\s*;/g, 'top: \$1px;');
		text = text.replace( /LEFT=(\d+)px\s*;/g, 'left: \$1px;');
		return text;
	}
);
