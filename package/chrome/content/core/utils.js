// Contains useful utilities

ru.dclan.ffdawfix.unloaderList = [];

ru.dclan.ffdawfix.utils = {
	addUnloader: function( f ) {
		var calls = ru.dclan.ffdawfix.unloaderList;
		calls[ calls.length ] = f;
	},
	unloadAll: function() {
		Array.forEach(ru.dclan.ffdawfix.unloaderList, function(call) { call.unload(); } );
	},
	trimLocation: function( url ) {
		var p1 = url.search('[?]');
		var p2 = url.search("#");
		if( p1 == -1 && p2 == -1) {
			return url;
		}
		if( p1 != -1 && p2 != -1) {
			return url.substr(0, (p1>p2?p2:p1));
		}
		return url.substr(0, ((p1==-1)?p2:p1));
	},
	checkLocation : function(location, part) {
		return location.toLowerCase().search( part.toLowerCase() ) != -1;
	},
	encode: function(text) {
		return unescape(encodeURIComponent( text ));
	},
	getBool : function(name, def) {
		var pm = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
		var prefix = "ru.dclan.ffdawfix.";
		var prefName = prefix + name;
		try {
			return pm.getBoolPref(prefName);
		} catch(e) {}
		if(def) return true;
		return false;
	},
	log :function(message) {
		try {
			var consoleService = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);  
			consoleService.logStringMessage(message);
		} catch(e) {}
	},
	trackLoad :function(module) {
		ru.dclan.ffdawfix.utils.log(module + " module loaded");
	},
	getPreferencesService: function() {
		return Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).getBranch("");
	},
	setStringPreference: function(preference, value) {
		if(preference) {
			var utils = ru.dclan.ffdawfix.utils;
			var supportsStringInterface = Ci.nsISupportsString;
			var string                  = Cc["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);
			string.data = value;
			utils.getPreferencesService().setComplexValue(preference, supportsStringInterface, string);
		}
	},
	clearUserPref: function(pref) {
		var utils = ru.dclan.ffdawfi.utils;
		try {
			utils.getPreferencesService().clearUserPref(pref);
		} catch(e) {}
	},
	isPreferenceSet: function(preference) {
		if(preference) {
			var utils = ru.dclan.ffdawfix.utils;
			return utils.getPreferencesService().prefHasUserValue(preference);
		}
		return false;
	},
	getStringPreference: function(preference) {
		var utils = ru.dclan.ffdawfix.utils;
		if(preference) {
			if(utils.isPreferenceSet(preference)) {
				try {
					return utils.getPreferencesService().getComplexValue(preference, Ci.nsISupportsString).data;
				} catch(exception) {}
			}
		}
		return null;
	},
}

ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.utils");