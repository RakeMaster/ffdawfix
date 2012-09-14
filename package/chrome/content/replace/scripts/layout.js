ru.dclan.ffdawfix.replacers.layout5 = function( f ) {
	if(!f.checkLocation( "/vr/scripts/layout5.js" )) return;
	f.addReplace( /\.document;/g, '.window;' );
	f.addReplace( /function DoMessage\(msg\) {/, "function DoMessage(msg) {\n\tmsg.txt = ffReplaceMessage(msg.txt);");
}
