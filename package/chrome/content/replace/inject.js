ru.dclan.ffdawfix.replacers.inject = function( f ) {
	if(f.isPathEmpty() || f.checkLocation(".htm") || f.checkLocation(".aspx")) {
		f.addCSS( "daw.css" );
	} else {
		return;
	}

	var stats = f.checkFlag( "stats" );
	if( f.checkLocation( "/vr/common/FighterInfo.aspx" ) ) {
		f.addJS( "daw/info.js" );
		if( stats ) {
			f.addJS( "daw/extra/stats.js" );
		}
		f.addJS( "daw/expcount.js" );
		return;
	}
	if( f.checkLocation( "/vr/battle/battle.aspx" ) ) {
		var prefs = {};
		prefs.battleLinks   = f.checkFlag( "battleLinks");
		prefs.battleCounter = f.checkFlag( "battleCounter");
		prefs.battleHealth  = f.checkFlag( "battleHealth");
		prefs.battleSmall   = f.checkFlag( "battleSmall");
		prefs.battleSound = f.checkFlag( "battleSound" );
		f.addPrefs( prefs );
		f.addJS( "daw/battle.js" );
		if( f.checkFlag( "dice" ) ) {
			f.addJS( "daw/extra/dice.js" );
		}
		if(stats) {
			f.addJS( "daw/extra/stats.js" );
		}
		if( f.checkFlag( "title" ) ) {
			f.addJS( "daw/extra/title.js" );
		}
		f.addJS( "daw/expcount.js" );
		return;
	}

	if( f.checkLocation( "/vr/places/GroupNear.aspx" ) ) {
		f.addJS( "daw/groupnear.js" );
		return;
	}
	if( f.checkLocation( "/vr/places/ResBuyShop.aspx" ) ) {
		f.addJS( "daw/sellall.js" );
		return;
	}
	if( f.checkLocation( "/vr/Menus/Msgs.aspx" ) ) {
		f.addJS( "daw/pm_msgs.js" );
		return;
	}
	if( f.checkLocation( "/vr/Places/" ) ) {
		if( f.checkFlag( "title" ) ) {
			f.addJS( "daw/extra/title.js" );
		}
		if( f.checkFlag( "altMenu" ) ) {
			f.addJS( "daw/extra/altmenu.js" );
		}
		if( f.checkFlag( "battleSound" )) {
			f.addJS( "daw/battlesound.js" );
		}
		f.addJS( "daw/ajax.js" );
		f.addJS( "daw/places.js" );
		f.addJS( "daw/expcount.js" );
		f.addJS( "daw/timers.js" );
		f.addJS( "daw/labextras.js" );

		if( f.checkLocation( "SPQuest.aspx" ) ) {
			f.addJS( "daw/spquest.js" );
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
	if( f.checkLocation( "/vr/Cht/ChInp3" ) ) {
		if( f.checkFlag( "chatInp" ) ) {
			f.addJS( "daw/extra/chinp.js" );
		}
		f.addJS( "daw/translit.js" );
		return;
	}
	if(  f.checkLocation( "/vr/Menus/BackPack.aspx" ) ) {
		if( f.checkFlag( "itemStats" ) ) {
			f.addJS( "daw/extra/itemstats.js" );
		}
		f.addJS( "daw/bpack.js" );
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
	if( f.checkLocation( "/vr/Menus/Clan.aspx" ) ) {
		if( f.checkFlag( "clanInfo" ) ) {
			f.addJS( "daw/extra/claninfo.js" );
		}
		f.addJS( "daw/clan.js" );
		return;
	}
	
	if( f.checkLocation( "smuta.com" ) ) {
		f.addCSS( "smuta/smuta.css" );
		f.addJS( "smuta/all.js" );
		f.addJS( "smuta/scroll.js" );
		f.addJS( "smuta/guests.js" );
		if( f.checkLocation( "/Forum/Topic.aspx" ) ) {
			f.addJS( "smuta/urlicons.js" );
		}
		if( f.checkLocation( "/Forum/Moderate.aspx" ) ) {
			f.addJS( "smuta/moderate.js" );
		}
		return;
	}
}
