// Contains logic, that triggers on page load (after DOM parsed)

ru.dclan.ffdawfix.onload = {
	startup : function() {
		var appcontent = document.getElementById('appcontent');
		if (appcontent) {
			appcontent.addEventListener('DOMContentLoaded', this.onDOMLoad, true);
		}
	},

	loadDaw : function(doc, loc) {
		var pm = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var prefix = "ru.dclan.ffdawfix.";
		var utils = ru.dclan.ffdawfix.utils;
		utils.injectCSS(doc,"daw.css");
		//This is a login page
		if(utils.isLoginPage(loc)) {
			utils.injectJS(doc, "daw/login.js");
			return;
		}
		var stats = utils.getBool(pm, prefix, "stats");
		if(utils.checkLocation(loc, "/vr/common/FighterInfo.aspx")) {
			var prefs = {};
			prefs.ringsFix = utils.getBool(pm, prefix, "ringsFix", true);
			prefs.giftsFix = utils.getBool(pm, prefix, "giftsFix", true);
			utils.injectPrefs(doc, prefs);
			utils.injectJS(doc, "daw/extra/info.js");
			if(stats) {
				utils.injectJS(doc, "daw/extra/stats.js");
			}
			return;
		}
		if(utils.checkLocation(loc, "/vr/battle/battle.aspx")) {
			var prefs = {};
			prefs.battleLinks   = utils.getBool(pm, prefix, "battleLinks");
			prefs.battleCounter = utils.getBool(pm, prefix, "battleCounter");
			prefs.battleHealth  = utils.getBool(pm, prefix, "battleHealth");
			prefs.battleSmall   = utils.getBool(pm, prefix, "battleSmall");
			utils.injectPrefs(doc, prefs);
			if(utils.getBool(pm, prefix, "title")) {
				utils.injectJS(doc, "daw/extra/title.js");
			}
			utils.injectJS(doc, "daw/battle.js");
			if(utils.getBool(pm, prefix, "dice")) {
				utils.injectJS(doc, "daw/extra/dice.js");
			}
			if(stats) {
				utils.injectJS(doc, "daw/extra/stats.js");
			}
			return;
		}
		if(utils.checkLocation(loc, "/vr/places/GroupNear.aspx")) {
			utils.injectJS(doc, "daw/groupnear.js");
			return;
		}
		if(utils.checkLocation(loc, "/vr/Places/")) {
			if(utils.getBool(pm, prefix, "title")) {
				utils.injectJS(doc, "daw/extra/title.js");
			}
			//Disabled
			if(false) {
				//if(utils.getBool(pm,prefix,"stationAutoTrip") && utils.checkLocation(loc,"/vr/places/Station.aspx")) {
				//We are changing location. No need to load any other scripts
				utils.injectJS(doc, "daw/extra/autotrip.js");
				return;
			}

			utils.injectJS(doc, "daw/ajax.js");
			utils.injectJS(doc, "daw/places.js");

			if(utils.checkLocation(loc, "/vr/places/MazeView.aspx")) {
				utils.injectCSS(doc, "scrolling.css");
			}

			if(utils.getBool(pm, prefix, "liveTimers")) {
				utils.injectJS(doc, "daw/extra/timers.js");
			}

			if(utils.getBool(pm, prefix, "tripButton")) {
				utils.injectJS(doc, "daw/extra/tripbutton.js");
			}
			if(stats) {
				utils.injectJS(doc, "daw/extra/stats.js");
			}
			return;
		}
		if(utils.checkLocation(loc, "Cht/pplOuter")) {
			utils.injectJS(doc, "daw/pplouter.js");
			return;
		}
		if(utils.checkLocation(loc, "Cht/ChOuter")) {
			utils.injectJS(doc, "daw/chouter.js");
			return;
		}
		if(utils.checkLocation(loc, "/vr/Layout.aspx")) {
			utils.injectJS(doc,"daw/sound.js");
			utils.injectJS(doc,"daw/layout.js");
			return;
		}
		if(utils.checkLocation(loc, "/vr/Cht/ChPeople")) {
			utils.injectJS(doc, "daw/chpeople.js");
			if(utils.getBool(pm, prefix, "chatList")) {
				//utils.injectJS(doc,"daw/ajax.js");
				utils.injectJS(doc,"daw/extra/chatlist.js");
			}
			return;
		}
		if(utils.checkLocation(loc, "/vr/smiles/smiles")) {
			utils.injectJS(doc, "daw/smile.js");
			return;
		}
		if(utils.getBool(pm, prefix, "itemStats") && utils.checkLocation(loc, "/vr/Menus/BackPack.aspx")) {
			utils.injectJS(doc, "daw/extra/itemstats.js");
			return;
		}
		if(utils.checkLocation(loc, "/vr/Menus/CityMap.aspx")) {
			utils.injectJS(doc, "daw/map.js");
			return;
		}
		if(utils.checkLocation(loc, "/vr/Cht/ChMsgs3.htm")) {
			utils.injectJS(doc, "daw/chmsgs.js");
			return;
		}
		if(utils.checkLocation(loc, "/vr/Menus/Friends.aspx")) {
			utils.injectJS(doc, "daw/friends.js");
			return;
		}
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

		if (domain == "darkagesworld.com" || domain == "smuta.com") {
			utils.injectJS(doc, "all.js");
		} else {
			return false;
		}

		if(domain == "smuta.com") {
			utils.injectJS(doc, "smuta.js");
		} else {
			var s = "";
			onload.loadDaw(doc, loc);
		}
	},
}

//window.addEventListener('load', function() ru.dclan.ffdawfix.onload.startup(), false);

ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.onload");