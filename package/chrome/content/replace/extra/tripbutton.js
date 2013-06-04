ru.dclan.ffdawfix.replacers.tripbutton = function( f ) {
	var r = f.checkFlag("tripButton") && f.checkLocation( "http://darkagesworld.com/vr/places/" );
	if(!r) return;

	// add new row
	var u8 = ru.dclan.ffdawfix.utils.encode;
	f.addReplace( /pnlMail([12])">\s*<img([^>]+)>\s*/,
		'pnlMail\$1" style="white-space: nowrap">'
		+ '<img\$2>'
		+ '<a style="font-size: 20pt; color: red; font-weight: bold;" href="/vr/Places/Group.aspx?Create=1">'
		+ u8("Поход")
		+ '</a>'
		+ '<span onclick="getTop().MenuLnk(window, 0);" style="text-decoration: underline; cursor: pointer; font-size: 20pt; color: white; font-weight: bold;">'
		+ u8("Карта")
		+ '</span>'
			);
}
