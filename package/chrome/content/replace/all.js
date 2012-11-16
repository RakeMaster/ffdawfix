ru.dclan.ffdawfix.replacers.all = function( f ) {
	var r = (
		f.checkLocation(".js")
		||
		f.checkLocation(".htm")
		||
		f.checkLocation(".aspx")
	);
	if(!r) return;
	f.addReplace( /\.innerText/g, '.textContent');
	f.addReplace( /.\s*all\(/g, '.getElementById(');
	f.addReplace( /document[\s]*[\.][\s]*frames/g, 'window.frames');
	f.addJS( "all.js" );
	if( f.checkLocation("http://smuta.com") ) {
		f.addJS( "smuta.js" );
	}
	
	f.addReplace( /([^A-Za-z0-9_])top\./g, '$1getTop().');
}
