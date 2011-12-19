// This file contains special observer for login page
// The purpose is to modify headers for login

// This observer is made for replacing user agent on login page (to show login form)
ru.dclan.ffdawfix.httpRequestObserver = {
	observe: function(subject, topic, data) {
		if (topic != "http-on-modify-request") return;
		//important to have next line before trying to access subject.URI
		var httpChannel = subject.QueryInterface(Components.interfaces.nsIHttpChannel);
		var url = subject.URI.spec.toLowerCase();
		var loginPage = "http://darkagesworld.com/vr/default.aspx";
		if (url.search(loginPage) == 0 ) {
			// Set ie6 user agent
			ru.dclan.ffdawfix.utils.log("Replacing agent for url " + url);
			httpChannel.setRequestHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 6.00; Windows NT 5.0)", false);
		}
	},

	get observerService() {
		return Components.classes["@mozilla.org/observer-service;1"]
			.getService(Components.interfaces.nsIObserverService);
	},

	register: function() {
		this.observerService.addObserver(this, "http-on-modify-request", false);
	},  

	unregister: function() {
		this.observerService.removeObserver(this, "http-on-modify-request");
	}
};

ru.dclan.ffdawfix.httpRequestObserver.register();

ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.login");