ru.dclan.ffdawfix.replace.observer.add(
	function(url) {
		return (
			url.search(".css") != -1
			||
			url.search(".htm") != -1
		);
	}
	,
	function(text) {
		var helper = function(t, name) {
			t = t.replace( new RegExp("scrollbar-" + name + "-color[^;]+;", 'g'), '');
			return t;
		}

		text = text.replace( /cursor:\s*hand/g, 'cursor: pointer');

		text = helper(text, 'face');
		text = helper(text, 'highlight');
		text = helper(text, 'shadow');
		text = helper(text, 'arrow');
		text = helper(text, 'track');
		text = helper(text, 'darkshadow');
		text = helper(text, 'base');
		
		return text;
	}
);
