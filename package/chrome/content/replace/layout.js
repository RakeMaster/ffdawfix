ru.dclan.ffdawfix.replacers.layout = function( f ) {
	if( !f.checkLocation("layout.aspx") ) return;
	f.addReplace( /frameborder="0"/gi, 'frameborder="1"');
	f.addReplace( '+Cash+', '+Number(String(Cash).replace(",",".")).toFixed(2)+');
}