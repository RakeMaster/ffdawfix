// Contains HTML text replace logic

ru.dclan.ffdawfix.replace = {};
ru.dclan.ffdawfix.replace.observer = {
	rlist: [],
	observe: function(subject, topic, data) {
		if (
				topic != "http-on-examine-response"
				&&
				topic != "http-on-examine-cached-response"
				&&
				topic != "http-on-examine-merged-response"
			) return;
		//important to have next line before trying to access subject.URI
		var httpChannel = subject.QueryInterface(Components.interfaces.nsIHttpChannel);
		var url = subject.URI.spec.toLowerCase();
		if(url.search("http://darkagesworld.com/") != 0 && url.search("http://smuta.com/") != 0) return;
		// Do not corrupt jquery
		if(url.search("jquery") != -1) return;
		var lst = [];
		for(var i = 0; i < this.rlist.length; ++i) {
			var checker = this.rlist[i].checker;
			if(checker(url)) {
				lst.push(this.rlist[i].replacer);
			}
		}
		if(lst.length > 0) {
			var newListener = new ru.dclan.ffdawfix.ReplaceListener(lst);
			subject.QueryInterface(Ci.nsITraceableChannel);
			newListener.originalListener = subject.setNewListener(newListener);
		}
	},

	get observerService() {
		return Components.classes["@mozilla.org/observer-service;1"]
			.getService(Components.interfaces.nsIObserverService);
	},

	register: function() {
		this.observerService.addObserver(this, "http-on-examine-response", false);
		this.observerService.addObserver(this, "http-on-examine-cached-response", false);
		this.observerService.addObserver(this, "http-on-examine-merged-response", false);
	},  

	unregister: function() {
		this.observerService.removeObserver(this, "http-on-examine-response");
		this.observerService.removeObserver(this, "http-on-examine-cached-response");
		this.observerService.removeObserver(this, "http-on-examine-merged-response");
	},
	
	add: function(c, r) {
		this.rlist.push({checker: c, replacer: r});
	}
};

ru.dclan.ffdawfix.replace.observer.register();
ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.replace");