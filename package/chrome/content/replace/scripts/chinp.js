ru.dclan.ffdawfix.replacers.chinp = function( f ) {
	if ( !f.checkLocation( "/vr/scripts/chinp3.js" ) ) return;
	f.addReplace( /{ text: str }/, '{ text: str.replace(/\\+/g, "%u002B") }');
	if( f.checkFlag("chatInp") ) {
		f.addReplace("function doResize() {", "function doResize() { return;");
	}
	f.addReplace("$('#btTranslit').click(function () {", "$& return;");
	f.addReplace("var lit_eng", "lit_eng");
	f.addReplace("var lit_rus", "lit_rus");
	f.addReplace( "$('#cbSound').attr('checked', data.sound);", "$('#cbSound').attr('checked', data.sound); \n document.getElementById('note').src = ((cb.checked) ? 'resource://ffdawfix/img/note_ch.png' : 'resource://ffdawfix/img/note_unch.png');");
}
