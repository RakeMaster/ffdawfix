ru.dclan.ffdawfix.replacers.layout5 = function( f ) {
	if(!f.checkLocation( "/vr/scripts/layout5.js" )) return;
	f.addReplace( /\.document;/g, '.window;' );
}
