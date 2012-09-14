ru.dclan.ffdawfix.replacers.chatlist = function( f ) {
	var r = f.checkFlag("chatList") && f.checkLocation( "/vr/cht/pplouter3.htm" );
	if(!r) return;
	f.addReplace( /scrolling="yes"/, 'scrolling="no"' );
}
