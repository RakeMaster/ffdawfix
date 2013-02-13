ru.dclan.ffdawfix.replacers.pmmsgs = function( f ) {
	if( !f.checkLocation( "/vr/Menus/Msgs.aspx" ) ) return;
	f.addReplace('cellpadding="1"', 'cellpadding="15"');
}
