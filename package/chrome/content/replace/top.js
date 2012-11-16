ru.dclan.ffdawfix.replacers.topframe = function( f ) {
	if( !f.checkLocation("default.aspx") && !f.checkLocation("layout.aspx") ) return;
	// Try to get parent pointer if avaliable. There could be situatetion when default.aspx inside layout.aspx. redirect required
	f.addJSText( "window.topFramePointer = window; try { window.topFramePointer = parent.window.topFramePointer; } catch(e) {}" );
}