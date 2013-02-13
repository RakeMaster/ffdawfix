function checkCity() {
	return getTop().RoomID;
}

ffAddOnLoad(function() {
	if( checkCity() == "3692ce11-81a2-4290-9228-9614aca52c2d" ) {
		document.body.style.backgroundImage = "url(resource://ffdawfix/img/albinarcave.jpg)";
	}
	else {
		document.body.style.backgroundImage = "url(resource://ffdawfix/img/avaloncave.jpg)";
	}
});