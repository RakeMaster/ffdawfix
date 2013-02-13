ru.dclan.ffdawfix.replacers.info = function( f ) {
	if( !f.checkLocation( "/vr/common/FighterInfo.aspx" ) ) return;
	f.addReplace(/<\/strong>/g,'</strong >&nbsp;');
}