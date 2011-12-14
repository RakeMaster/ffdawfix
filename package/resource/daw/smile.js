(function() {
	//Fix for smile dialog
	if(window.smile) {
		if(window.opener) {
			window.dialogArguments =  opener.top;
		}
	}
})();