// Contains useful utilities

ru.dclan.ffdawfix.utils = {
	checkLocation : function(location, part) {
		return location.toLowerCase().search( part.toLowerCase() ) != -1;
	},
	encode: function(text) {
		return unescape(encodeURIComponent( text ));
	},
	injectCSS : function(doc, name) {
		var src = 'resource://ffdawfix/' + name;
		var style = doc.createElement('link');
		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('type', 'text/css');
		style.setAttribute('href', src);
		doc.getElementsByTagName('head')[0].appendChild(style);
	},
	injectJS : function(doc, name) {
		var src = 'resource://ffdawfix/' + name;
		var script = doc.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', src);
		doc.getElementsByTagName('head')[0].appendChild(script);
	},
	injectJSText : function(doc, text) {
		var script = doc.createElement('script');
		script.textContent = text;
		script.setAttribute('type', 'text/javascript');
		doc.getElementsByTagName('head')[0].appendChild(script);
	},
	isLoginPage :function(loc) {
		var utils = ru.dclan.ffdawfix.utils; 
		return utils.checkLocation(loc, "/vr/Default.aspx");
	},
	getBool : function(name, def) {
		var pm = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var prefix = "ru.dclan.ffdawfix.";
		var prefName = prefix + name;
		try {
			return pm.getBoolPref(prefName);
		} catch(e) {}
		if(def) return true;
		return false;
	},
	log :function(message) {
		var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);  
		consoleService.logStringMessage(message);  
	},
	trackLoad :function(module) {
		ru.dclan.ffdawfix.utils.log(module + " module loaded");
	},
	injectPrefs: function(doc, prefs) {
		var utils = ru.dclan.ffdawfix.utils;
		var prefsJS = "var ffdawfix = {};\nffdawfix.prefs={};\n";
		for(var i in prefs) {
			prefsJS += "ffdawfix.prefs." + i + "=" + prefs[i] + ";\n";
		}
		utils.injectJSText(doc, prefsJS);
	},
	getPreferencesService: function() {
		return Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("");
	},
	setStringPreference: function(preference, value) {
		if(preference) {
			var utils = ru.dclan.ffdawfix.utils;
			var supportsStringInterface = Components.interfaces.nsISupportsString;
			var string                  = Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);
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
					return utils.getPreferencesService().getComplexValue(preference, Components.interfaces.nsISupportsString).data;
				} catch(exception) {}
			}
		}
		return null;
	},
}

ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.utils");