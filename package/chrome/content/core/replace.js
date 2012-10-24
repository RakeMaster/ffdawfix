// Contains HTML text replace logic

ru.dclan.ffdawfix.replace = {};

ru.dclan.ffdawfix.replace.StringReplacer = function(src, dst) {
	this.src = src;
	this.dst = dst;
}

ru.dclan.ffdawfix.replace.StringReplacer.prototype = {
		run: function(txt,i) {
			if(i) {
				ru.dclan.ffdawfix.utils.log( i + ": " + this.src +" to "+ this.dst );
			}
			return txt.replace(this.src, this.dst);
		}
}

ru.dclan.ffdawfix.replace.Logger = function(prefix) {
	this.prefix = prefix;
}

ru.dclan.ffdawfix.replace.Logger.prototype = {
		run: function(txt) {
			ru.dclan.ffdawfix.utils.log( this.prefix + txt);
			return txt;
		},
}

//Copy response listener implementation.
ru.dclan.ffdawfix.replace.Replacer = function(url) {
	this.url = url?ru.dclan.ffdawfix.utils.trimLocation(url):"";
	this.replacers = [];
	this.includes = [];
	this.newContent = null;
	this.called = false;
}

ru.dclan.ffdawfix.replace.Replacer.prototype = {
	replaceContent: function(txt) {
		this.newContent = txt;
	},
	addReplacer: function( f ) {
		this.replacers[ this.replacers.length ] = f;
	},
	addReplace: function( from, to ) {
		this.addReplacer ( new ru.dclan.ffdawfix.replace.StringReplacer(from, to) );
	},
	needReplace: function() {
		return this.newContent || (this.replacers.length > 0) || (this.includes.length > 0);
	},
	checkFlag: function( flag, def ) {
		return ru.dclan.ffdawfix.utils.getBool( flag, def );
	},
	checkLocation: function( loc ) {
		return ru.dclan.ffdawfix.utils.checkLocation( this.url, loc );
	},
	replace: function(txt) {
		if(this.called) alert("Replacer multicall");
		if(this.newContent) {
			return this.newContent;
		}
		for(var i = 0; i < this.replacers.length; ++i) {
			var cur = this.replacers[i];
			try {
				if(cur.run) {
					var index = null
					if(this.url.search("layout") != -1) {
						index = i;
					}
					txt = cur.run(txt, i);
				} else {
					txt = cur(txt);
				}
			} catch(e) {
				alert( "Exception while executing replacer: " + e + "\n" );
			}
		}
		if(this.includes.length > 0) {
			var incs = this.includes.join('');
			var rep = new ru.dclan.ffdawfix.replace.StringReplacer("</head>", incs + "</head >");
			txt = rep.run(txt);
		}
		return txt;
	}
	,addToHead: function( str ) {
		this.includes[this.includes.length] = str;
	},
	addCSS : function( name ) {
		var src = 'resource://ffdawfix/' + name;
		this.addToHead( '<link rel="stylesheet" type="text/css" href="' + src + '" />' );
	},
	addJS : function( name ) {
		var src = 'resource://ffdawfix/' + name;
		this.addToHead( '<script type="text/javascript" src="' + src + '"></script>' );
	},
	addJSText : function( text ) {
		this.addToHead( '<script type="text/javascript"><!--\n' + text+ '\n--></script>' );
	},
	addPrefs: function( prefs ) {
		var utils = ru.dclan.ffdawfix.utils;
		var prefsJS = "var ffdawfix = {};\nffdawfix.prefs={};\n";
		for(var i in prefs) {
			prefsJS += "ffdawfix.prefs." + i + "=" + prefs[i] + ";\n";
		}
		this.addJSText( prefsJS );
	},
}

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
		if(
			url.search("http://darkagesworld.com/") != 0
			&& url.search("http://[a-z0-9A-Z]+.darkagesworld.com/") != 0
			&& url.search("http://smuta.com/") != 0
		) return;
		// Do not corrupt jquery
		if(url.search("jquery") != -1) {
			return;
		}
		ru.dclan.ffdawfix.utils.log( "topic" + topic );
		var replacer = new ru.dclan.ffdawfix.replace.Replacer(url);
		for(var i = 0; i < this.rlist.length; ++i) {
			this.rlist[i]( replacer );
		}
		if(replacer.needReplace()) {
			var RL = ru.dclan.ffdawfix.ReplaceListener;
			var newListener = new RL( replacer );
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
		for(var i in rs) {
			ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.replacers." + i);
			this.rlist.push( rs[i] )
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