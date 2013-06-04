ru.dclan.ffdawfix.replacers.smuta = function( f ) {
	if( !f.checkLocation("IPBlocks.aspx") ) return;
	f.addReplace(/url =.*/g, 'url = "http://www.geoiptool.com/ru/?IP=" + addr;');
}
