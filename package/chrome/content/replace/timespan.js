ru.dclan.ffdawfix.replacers.timespan = function( f ) {
	if( !f.checkLocation( "/vr/common/clock.js" ) ) return;
	f.addReplace( /timespan\./, 'document.getElementById("timespan").');
	f.addReplace('function','if(!getTop().clockCorrection) getTop().clockCorrection = -7236843;\nfunction');
}
