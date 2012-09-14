ru.dclan.ffdawfix.replacers.smiles = function( f ) {
	if( !f.checkLocation( "/vr/smiles/smiles" ) ) return;
	f.addReplace( /dialogArguments/g, 'opener.top');
}
