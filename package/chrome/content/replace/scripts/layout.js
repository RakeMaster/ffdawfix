ru.dclan.ffdawfix.replacers.layout5 = function( f ) {
	if(!f.checkLocation( "/vr/scripts/layout5.js" )) return;
	f.addReplace( /\.document;/g, '.window;' );
	f.addReplace( /function DoMessage\(msg\) {/, "function DoMessage( msg ) {\n\tffReplaceMessage( msg );");
	f.addReplace("if (topFrm) {", "$&"
		+ "\n\t\t"
		+ "var mazeFound = getTop().topfrm.document.getElementById('frame2');"
		+ "\n\t\t"
		+ "if(mazeFound && mazeFound.src.search(/mazeFound.aspx/i) > -1) mazeFound.src = mazeFound.src;"
		+ "\n\t\t"
		+ "var mazePlayers = getTop().topfrm.document.getElementById('frame1');"
		+ "\n\t\t"
		+ "if(mazePlayers && mazePlayers.src.search(/MazePlayersAround.aspx/i) > -1) mazePlayers.src = mazePlayers.src;"
	);
}
