if(!ru) var ru = {};
if(!ru.dclan) ru.dclan = {};
if(!ru.dclan.ffdawfix) ru.dclan.ffdawfix={};

ru.dclan.ffdawfix = {
	checkLocation : function(location, part) {
		return location.toLowerCase().search( part.toLowerCase() ) != -1;
	},

	startup : function() {
		var appcontent = document.getElementById('appcontent');
		if (appcontent) {
			appcontent.addEventListener('DOMContentLoaded', this.onDOMLoad, true);
		}
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
	getBool : function(prefManager, prefix, name, def) {
		var prefName = prefix + name;
		try {
			return prefManager.getBoolPref(prefName);
		} catch(e) {}
		if(def) return true;
		return false;
	},
	isLoginPage :function(loc) {
		var ths = ru.dclan.ffdawfix; 
		return ths.checkLocation(loc, "/vr/Default.aspx");
	},
	loadDaw : function(doc, loc) {
		var pm = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var prefix = "ru.dclan.ffdawfix.";
		var ths = ru.dclan.ffdawfix; 
		ths.injectCSS(doc,"daw.css");
		//This is a login page
		if(ths.isLoginPage(loc)) {
			ths.injectJS(doc, "daw/login.js");
			return;
		}
		var stats = ths.getBool(pm, prefix, "stats");
		if(ths.checkLocation(loc, "/vr/common/FighterInfo.aspx")) {
			var prefs = {};
			prefs.ringsFix = ths.getBool(pm, prefix, "ringsFix", true);
			prefs.giftsFix = ths.getBool(pm, prefix, "giftsFix", true);
			ths.injectPrefs(doc, prefs);
			ths.injectJS(doc, "daw/extra/info.js");
			if(stats) {
				ths.injectJS(doc, "daw/extra/stats.js");
			}
			return;
		}
		if(ths.checkLocation(loc, "/vr/battle/battle.aspx")) {
			var prefs = {};
			prefs.battleLinks   = ths.getBool(pm, prefix, "battleLinks");
			prefs.battleCounter = ths.getBool(pm, prefix, "battleCounter");
			prefs.battleHealth  = ths.getBool(pm, prefix, "battleHealth");
			prefs.battleSmall   = ths.getBool(pm, prefix, "battleSmall");
			ths.injectPrefs(doc, prefs);
			if(ths.getBool(pm, prefix, "title")) {
				ths.injectJS(doc, "daw/extra/title.js");
			}
			ths.injectJS(doc, "daw/battle.js");
			if(ths.getBool(pm, prefix, "dice")) {
				ths.injectJS(doc, "daw/extra/dice.js");
			}
			if(stats) {
				ths.injectJS(doc, "daw/extra/stats.js");
			}
			return;
		}
		if(ths.checkLocation(loc, "/vr/places/GroupNear.aspx")) {
			ths.injectJS(doc, "daw/groupnear.js");
			return;
		}
		if(ths.checkLocation(loc, "/vr/Places/")) {
			if(ths.getBool(pm, prefix, "title")) {
				ths.injectJS(doc, "daw/extra/title.js");
			}
			//Disabled
			if(false) {
				//if(ths.getBool(pm,prefix,"stationAutoTrip") && ths.checkLocation(loc,"/vr/places/Station.aspx")) {
				//We are changing location. No need to load any other scripts
				ths.injectJS(doc, "daw/extra/autotrip.js");
				return;
			}

			ths.injectJS(doc, "daw/ajax.js");
			ths.injectJS(doc, "daw/places.js");

			if(ths.checkLocation(loc, "/vr/places/MazeView.aspx")) {
				ths.injectCSS(doc, "scrolling.css");
			}

			if(ths.getBool(pm, prefix, "liveTimers")) {
				ths.injectJS(doc, "daw/extra/timers.js");
			}

			if(ths.getBool(pm, prefix, "tripButton")) {
				ths.injectJS(doc, "daw/extra/tripbutton.js");
			}
			if(stats) {
				ths.injectJS(doc, "daw/extra/stats.js");
			}
			return;
		}
		if(ths.checkLocation(loc, "Cht/pplOuter")) {
			ths.injectJS(doc, "daw/pplouter.js");
			return;
		}
		if(ths.checkLocation(loc, "Cht/ChOuter")) {
			ths.injectJS(doc, "daw/chouter.js");
			return;
		}
		if(ths.checkLocation(loc, "/vr/Layout.aspx")) {
			ths.injectJS(doc,"daw/sound.js");
			ths.injectJS(doc,"daw/layout.js");
			return;
		}
		if(ths.checkLocation(loc, "/vr/Cht/ChPeople")) {
			ths.injectJS(doc, "daw/chpeople.js");
			if(ths.getBool(pm, prefix, "chatList")) {
				//ths.injectJS(doc,"daw/ajax.js");
				ths.injectJS(doc,"daw/extra/chatlist.js");
			}
			return;
		}
		if(ths.checkLocation(loc, "/vr/smiles/smiles")) {
			ths.injectJS(doc, "daw/smile.js");
			return;
		}
		if(ths.getBool(pm, prefix, "itemStats") && ths.checkLocation(loc, "/vr/Menus/BackPack.aspx")) {
			ths.injectJS(doc, "daw/extra/itemstats.js");
			return;
		}
		if(ths.checkLocation(loc, "/vr/Menus/CityMap.aspx")) {
			ths.injectJS(doc, "daw/map.js");
			return;
		}
		if(ths.checkLocation(loc, "/vr/Cht/ChMsgs3.htm")) {
			ths.injectJS(doc, "daw/chmsgs.js");
			return;
		}
		if(ths.checkLocation(loc, "/vr/Menus/Friends.aspx")) {
			ths.injectJS(doc, "daw/friends.js");
			return;
		}
	},
	injectPrefs: function(doc, prefs) {
		var ths = ru.dclan.ffdawfix;
		var prefsJS = "var ffdawfix = {};\nffdawfix.prefs={};\n";
		for(var i in prefs) {
			prefsJS += "ffdawfix.prefs." + i + "=" + prefs[i] + ";\n";
		}
		ths.injectJSText(doc,prefsJS);
	},
	getPreferencesService: function() {
		return Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("");
	},
	setStringPreference: function(preference, value) {
		if(preference) {
			var ths = ru.dclan.ffdawfix;
			var supportsStringInterface = Components.interfaces.nsISupportsString;
			var string                  = Components.classes["@mozilla.org/supports-string;1"].createInstance(supportsStringInterface);
			string.data = value;
			ths.getPreferencesService().setComplexValue(preference, supportsStringInterface, string);
		}
	},
	clearUserPref: function(pref) {
		var ths = ru.dclan.ffdawfix;
		try {
			ths.getPreferencesService().clearUserPref(pref);
		} catch(e) {}
	},
	isPreferenceSet: function(preference) {
		if(preference) {
			var ths = ru.dclan.ffdawfix;
			return ths.getPreferencesService().prefHasUserValue(preference);
		}

		return false;
	},
	getStringPreference: function(preference) {
		var ths = ru.dclan.ffdawfix;
		if(preference) {
			if(ths.isPreferenceSet(preference)) {
				try {
					return ths.getPreferencesService().getComplexValue(preference, Components.interfaces.nsISupportsString).data;
				} catch(exception) {}
			}
		}
		return null;
	},
	onDOMLoad : function(e) {
		var ths = ru.dclan.ffdawfix;
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
		//Lets check. Maybe we do not need to do any fixes at all
		//Maybe we need to mask first and reload page?
		if(ths.isLoginPage(loc)) {
			var notIE = doc.getElementById('pnlNotIE');
			//We are not IE
			var pname = "general.useragent.override";
			var mypname = "ru.dclan.ffdawfix.useragent.override";
			var maskAs = "Mozilla/4.0 (compatible; MSIE 6.00; Windows NT 5.0)";

			if(notIE) {
				var cur = ths.getStringPreference(pname);
				if(cur == maskAs) return;
				if(cur) {
					//Save the old value
					ths.setStringPreference(mypname,cur);
				}
				//Mask
				ths.setStringPreference(pname,maskAs);
				//And reload the page. We will be in else branch next time
				doc.location.reload();
				return;
			} else {
				var old = ths.getStringPreference(mypname);
				if(old) {
					//retrive saved
					ths.setStringPreference(pname,old);
					ths.clearUserPref(mypname);
				} else	{
					//or drop
					ths.clearUserPref(pname);
				}
			}
		}

		if (domain == "darkagesworld.com" || domain == "smuta.com") {
			ths.injectJS(doc, "all.js");
		} else {
			return false;
		}

		if(domain == "smuta.com") {
			ths.injectJS(doc, "smuta.js");
		} else {
			var s = "";
			ths.loadDaw(doc, loc);
		}
	}
}

window.addEventListener('load', function() ru.dclan.ffdawfix.startup(), false);