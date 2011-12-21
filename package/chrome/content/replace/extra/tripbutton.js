ru.dclan.ffdawfix.replace.observer.add(
	function(url) {
		var r = (
				ru.dclan.ffdawfix.utils.getBool("tripButton") 
				&&
			(url.search("http://darkagesworld.com/vr/places/") == 0)
		);
		if( r ) {
			ru.dclan.ffdawfix.utils.log( "Added for " + url );
		}
		return r;
	}
	,
	function(text) {
		// add new row
		ru.dclan.ffdawfix.utils.log("replacing!!!");
		var u8 = ru.dclan.ffdawfix.utils.encode;
		text = text.replace( /<div id="Head_pnlMail2">\s*/, 
				'<div id="Head_pnlMail2" style="white-space: nowrap">'
				+ '<a style="font-size: 20pt; color: red; font-weight: bold;" href="/vr/Places/Group.aspx?Create=1">'
				+ u8("Поход")
				+ '</a>'
				+ '<span onclick="top.MenuLnk(window, 0);" style="text-decoration: underline; cursor: pointer; font-size: 20pt; color: white; font-weight: bold;">'
				+ u8("Карта")
				+ '</span>');
		return text;
	}
);
ru.dclan.ffdawfix.utils.trackLoad("Extra tripbutton");
