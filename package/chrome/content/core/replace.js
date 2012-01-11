// Contains HTML text replace logic

ru.dclan.ffdawfix.replace = {};
ru.dclan.ffdawfix.replace.observer = {
	rlist: [],
	observe: function(subject, topic, data) {
		var cached = true;
		if (
				topic == "http-on-examine-response"
				||
				topic == "http-on-examine-merged-response"
		) {
			cached = false;
		} else if( topic == "http-on-examine-cached-response" ) {
			cached = true;
		} else {
			return;
		}
		//important to have next line before trying to access subject.URI
		var httpChannel = subject.QueryInterface(Components.interfaces.nsIHttpChannel);
		var url = subject.URI.spec.toLowerCase();
		if(url.search("http://darkagesworld.com/") != 0 && url.search("http://smuta.com/") != 0) return;
		// Do not corrupt jquery
		if(url.search("jquery") != -1) return;
		var lst = [];
		for(var i = 0; i < this.rlist.length; ++i) {
			var checker = this.rlist[i].check;
			if(checker(url)) {
				lst.push(this.rlist[i].replace);
			}
		}
		if(lst.length > 0) {
			var RL = ru.dclan.ffdawfix.ReplaceListener;
			var newListener = new RL(lst);
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
		this.rlist = [];
		var rs = ru.dclan.ffdawfix.replacers;
		var errors = "";
		for(var i in rs) {
			var cur = rs[i];
			if(!cur.check) {
				errors += ( "ru.dclan.ffdawfix.replacers." + i + " have no check function!\n");
				continue;
			}
			if(!cur.replace) {
				errors += ( "ru.dclan.ffdawfix.replacers." + i + " have no replace function!\n");
				continue;
			}
			ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.replacers." + i);
			this.rlist.push(cur)
		}
	},  

	unregister: function() {
		this.observerService.removeObserver(this, "http-on-examine-response");
		this.observerService.removeObserver(this, "http-on-examine-cached-response");
		this.observerService.removeObserver(this, "http-on-examine-merged-response");
	}
};

ru.dclan.ffdawfix.replace.observer.register();
ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.replace");