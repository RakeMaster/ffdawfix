ru.dclan.ffdawfix.replacers.all = {
	check: function(url) {
		return (
			url.search(".js") != -1
			||
			url.search(".htm") != -1
			||
			url.search(".aspx") == url.length - 5
		);
	},
	replace: function(text) {
		text = text.replace( /\.innerText/g, '.textContent');

		//text = text.replace( /document\s*\.\s*all/g, 'document.getElementById');
		text = text.replace( /.\s*all\(/g, '.getElementById(');
		text = text.replace( /document[\s]*[\.][\s]*frames/g, 'window.frames');
		return text;
	}
};
