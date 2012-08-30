ru.dclan.ffdawfix.replacers.chinp = {
	check: function(url) {
		var r = (
			(url.search("http://darkagesworld.com/vr/scripts/chinp3.js") == 0)
		);
		return r;
	},
	replace: function(text) {
		text = text.replace( /{ text: str }/, 
				'{ text: str.replace(/\\+/g, "%u002B") }'
				);
		return text;
	}
};
