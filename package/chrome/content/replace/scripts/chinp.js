ru.dclan.ffdawfix.replacers.chinp = function( f ) {
	if ( !f.checkLocation( "/vr/scripts/chinp3.js" ) ) return;
	f.addReplace( /{ text: str }/, '{ text: str.replace(/\\+/g, "%u002B") }');
	if( f.checkFlag("chatInp") ) {
		f.addReplace("function doResize() {", "function doResize() { return;");
	}
}
