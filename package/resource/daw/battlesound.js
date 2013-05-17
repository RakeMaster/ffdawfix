function saveFlag() {
	getTop().mainFrmLoc = window.location.href;
}

ffAddOnLoad(function() {
	saveFlag();
});
