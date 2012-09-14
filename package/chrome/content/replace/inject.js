ru.dclan.ffdawfix.replacers.inject = function( f ) {
	if(f.checkLocation(".htm") || f.checkLocation(".aspx")) {
		f.addCSS( "daw.css" );
	} else {
		return;
	}

	var stats = f.checkFlag( "stats" );
	if( f.checkLocation( "/vr/common/FighterInfo.aspx" ) ) {
		var prefs = {};
		prefs.ringsFix = utils.getBool( "ringsFix", true);
		prefs.giftsFix = utils.getBool( "giftsFix", true);
		utils.injectPrefs(doc, prefs);
		d.addJS( "daw/extra/info.js" );
		if( f.checkFlag(stats) ) {
			f.addJS( "daw/extra/stats.js" );
		}
		return;
	}
	if( f.checkLocation( "/vr/battle/battle.aspx" ) ) {
		var prefs = {};
		prefs.battleLinks   = utils.getBool( "battleLinks");
		prefs.battleCounter = utils.getBool( "battleCounter");
		prefs.battleHealth  = utils.getBool( "battleHealth");
		prefs.battleSmall   = utils.getBool( "battleSmall");
		f.addPrefs( prefs );
		if( f.checkFlag( "title" ) ) {
			f.addJS( "daw/extra/title.js" );
		}
		f.addJS( "daw/battle.js" );
		if( f.checkFlag( "dice" ) ) {
			faddJS( "daw/extra/dice.js" );
		}
		if(stats) {
			f.addJS( "daw/extra/stats.js" );
		}
		return;
	}
	if( f.checkLocation( "/vr/places/GroupNear.aspx" ) ) {
		f.addJS( "daw/groupnear.js" );
		return;
	}
	if( f.checkLocation( "/vr/Places/" ) ) {
		if( f.checkFlag( "title" ) ) {
			f.addJS( "daw/extra/title.js" );
		}
		if( f.checkFlag( "altMenu" ) ) {
			f.addJS( "daw/extra/altmenu.js" );
		}

		f.addJS( "daw/ajax.js" );
		f.addJS( "daw/places.js" );

		if( f.checkLocation( "/vr/places/MazeView.aspx" )) {
			f.addCSS( "scrolling.css" );
		}

		if( f.checkFlag( "liveTimers" )) {
			f.addJS( "daw/extra/timers.js" );
		}

		if(stats) {
			f.addJS( "daw/extra/stats.js" );
		}
		return;
	}
	if( f.checkLocation( "Cht/pplOuter" ) ) {
		f.addJS( "daw/pplouter.js" );
		return;
	}
	if( f.checkLocation( "/vr/Layout.aspx" ) ) {
		f.addJS( "daw/sound.js" );
		f.addJS( "daw/layout.js" );
		return;
	}
	if( f.checkLocation( "/vr/Cht/ChPeople" ) ) {
		f.addJS( "daw/chpeople.js" );
		if( f.checkFlag( "chatList" ) ) {
			f.addJS( "daw/extra/chatlist.js" );
		}
		return;
	}
	if( f.checkFlag( "itemStats" ) && f.checkLocation( "/vr/Menus/BackPack.aspx" ) ) {
		f.addJS( "daw/extra/itemstats.js" );
		return;
	}
	if( f.checkLocation( "/vr/Menus/CityMap.aspx" ) ) {
		f.addJS( "daw/map.js"  );
		return;
	}
	if( f.checkLocation( "/vr/Cht/ChOuter1.htm" ) ) {
		f.addJS( "daw/chmsgs.js" );
		return;
	}
	if( f.checkLocation( "/vr/Menus/Friends.aspx" ) ) {
		f.addJS( "daw/friends.js" );
		return;
	}
}