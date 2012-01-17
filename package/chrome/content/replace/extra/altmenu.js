ru.dclan.ffdawfix.replacers.tripbutton = {
	check: function(url) {
		var r = (
				ru.dclan.ffdawfix.utils.getBool("altMenu") 
				&&
			(url.search("http://darkagesworld.com/vr/scripts/fighter.js") == 0)
		);
		return r;
	},
	replace: function(text) {
		return ""; // Just empty
	}
};
