function getCityName() {
	e = getTop().RoomID;
	if(e == "39213d93-ae69-444b-9dd2-92a2fb72c009" || e == "6eed1889-4f54-4fbb-9a72-d4c18995a31a" || e == "3692ce11-81a2-4290-9228-9614aca52c2d") {
		return "albinar";
	}
}

ffAddOnLoad(function() {
	if(getCityName() == "albinar") {
		document.body.style.backgroundImage = "url(resource://ffdawfix/img/albinarcave.jpg)";
	}
	else {
		document.body.style.backgroundImage = "url(resource://ffdawfix/img/avaloncave.jpg)";
	}
});