ru.dclan.ffdawfix.replacers.places = function( f ) {
	if( !f.checkLocation( "/vr/places/" ) ) return;
	if( !f.checkFlag( "chatInp" ) ) return;
	f.addReplace( '<script language="javascript" src="../common/clock.js"> </script>', '' );
	f.addReplace( /id=".*Head_lbCityLimit"/, 'id="Head_lbCityLimit" style="position:relative;left:-50px;"' );
}
