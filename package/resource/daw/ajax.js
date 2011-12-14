var ajaxHandlers = new Array();

function addAjaxHandler(handler) {
	ajaxHandlers[ajaxHandlers.length] = handler; 
}

function fireAjaxHandlers() {
	for(var i in ajaxHandlers) {
		ajaxHandlers[i]();
	}
}

(function() {
	if(window.Sys && window.Sys.WebForms) {
		Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(fireAjaxHandlers);
	}
})();