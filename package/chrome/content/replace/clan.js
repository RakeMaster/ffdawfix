ru.dclan.ffdawfix.replacers.clan = function( f ) {
	if( !f.checkLocation( "/vr/menus/clan" ) ) return;
	f.addReplace(/addrcpt/g,'addprcpt');
}
