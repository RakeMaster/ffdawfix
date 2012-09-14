ru.dclan.ffdawfix.replacers.sendMessage = function( f ) {
	var r = f.checkLocation( "/vr/cht2/sendmessage" );
	if(!r) return;
	f.replaceContent("<html></html>");
}
