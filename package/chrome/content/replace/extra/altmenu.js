ru.dclan.ffdawfix.replacers.altMenu = function( f ) {
	var r = f.checkFlag( "altMenu" ) && f.checkLocation( "/vr/scripts/fighter.js" );
	if(!r) return;
	f.replaceContent("");
}
