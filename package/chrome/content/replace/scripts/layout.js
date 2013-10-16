ru.dclan.ffdawfix.replacers.layout5 = function( f ) {
	if(!f.checkLocation( "/vr/scripts/layout5.js" )) return;
	f.addReplace( /\.document;/g, '.window;' );
	f.addReplace( /function DoMessage\(msg\) {/, "function DoMessage( msg ) {\n\tffReplaceMessage( msg );");
	f.addReplace( "$(msgs).scrollTop(65000);", "msgs.scrollTop = 999999;" );
	f.addReplace("if (topFrm) {", "$&"
		+ "\n\t\t"
		+ "var a = topfrm.document.getElementById('Head_pnlMail1') || topfrm.document.getElementById('Head_pnlMail2');"
		+ "\n\t\t"
		+ "if(a) var img = a.getElementsByTagName('img')[0];"
		+ "\n\t\t"
		+ 'if(a) httpGet("/vr/places/redirector.aspx").replace(/<img onclick=.*.gif">/g, function(e){img.outerHTML = e.replace("alt","title");});'
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
