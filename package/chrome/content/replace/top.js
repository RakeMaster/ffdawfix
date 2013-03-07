ru.dclan.ffdawfix.replacers.topframe = function( f ) {
	if( !f.checkLocation("default.aspx") && !f.checkLocation("smuta.com") && !f.checkLocation("layout.aspx") ) return;
	f.addJSText( "window.isTopFrame = true;" );
}