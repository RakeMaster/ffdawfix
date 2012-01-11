ru.dclan.ffdawfix.replacers.tripbutton = {
	check: function(url) {
		var r = (
				ru.dclan.ffdawfix.utils.getBool("tripButton") 
				&&
			(url.search("http://darkagesworld.com/vr/places/") == 0)
		);
		return r;
	},
	replace: function(text) {
		// add new row
		var u8 = ru.dclan.ffdawfix.utils.encode;
		text = text.replace( /pnlMail([12])">\s*<img([^>]+)>\s*/, 
				'pnlMail\$1" style="white-space: nowrap">'
				+ '<img\$2>'
				+ '<a style="font-size: 20pt; color: red; font-weight: bold;" href="/vr/Places/Group.aspx?Create=1">'
				+ u8("Поход")
				+ '</a>'
				+ '<span onclick="top.MenuLnk(window, 0);" style="text-decoration: underline; cursor: pointer; font-size: 20pt; color: white; font-weight: bold;">'
				+ u8("Карта")
				+ '</span>'
				);
		return text;
	}
};
