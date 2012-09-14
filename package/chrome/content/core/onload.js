// Contains logic, that triggers on page load (after DOM parsed)

ru.dclan.ffdawfix.onload = {
	startup : function() {
		var appcontent = document.getElementById('appcontent');
		if (appcontent) {
			appcontent.addEventListener('DOMContentLoaded', this.onDOMLoad, true);
		}
	},

	loadDaw : function(doc, loc) {
		
	},
	onDOMLoad : function(e) {
		var utils = ru.dclan.ffdawfix.utils;
		var onload = ru.dclan.ffdawfix.onload;
		var doc = e.originalTarget;

		if (!(doc instanceof HTMLDocument)) {
			return;
		}

		var domain = null;
		try {
			domain = String(doc.domain); 
		} catch (e if e.result == Cr.NS_ERROR_FAILURE) {
			return;
		}
		if(!doc.location) return;
		var loc = doc.location.href;

		if(domain != "smuta.com") {
			onload.loadDaw(doc, loc);
		}
	},
}

window.addEventListener('load', function() ru.dclan.ffdawfix.onload.startup(), false);

ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.onload");