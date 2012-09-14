ru.dclan.ffdawfix.replacers.all = function( f ) {
	var r = (
		f.url.search(".js") != -1
		||
		f.url.search(".htm") != -1
		||
		f.url.search(".aspx") != -1
	);
	if(!r) return;
	f.addReplace( /\.innerText/g, '.textContent');
	f.addReplace( /.\s*all\(/g, '.getElementById(');
	f.addReplace( /document[\s]*[\.][\s]*frames/g, 'window.frames');
	f.addJS( "all.js" );
	if( f.checkLocation("http://smuta.com") ) {
		f.addJS( "smuta.js" );
	}
}
