ru.dclan.ffdawfix.replacers.all = function( f ) {
	var r = (
		f.isPathEmpty() // for "http://smuta.com/" path (no extension)
		||
		f.checkLocation(".js")
		||
		f.checkLocation(".htm")
		||
		f.checkLocation(".aspx")
	);
	if(!r) {
		ru.dclan.ffdawfix.utils.log("Skip " + f.url + " path=" + f.path);
		return;
	}
	f.addReplace( /\.innerText/g, '.textContent');
	
	f.addReplace( /.\s*all\(/g, '.getElementById(');
	f.addReplace( /document[\s]*[\.][\s]*frames/g, 'window.frames');
	f.addJS( "all.js" );
	if( f.checkLocation("http://smuta.com") ) {
		f.addJS( "smuta.js" );
		f.addReplace( /font-size: x-small;/g, 'font-size: 14px;');

		if( f.checkFlag("gsearch") ) {
			f.addJS( "daw/extra/search.js" );
		}
	}
	
	f.addReplace( /([^A-Za-z0-9_])top\./g, '$1getTop().');
}
