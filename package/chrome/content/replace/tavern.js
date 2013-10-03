ru.dclan.ffdawfix.replacers.tavern = function( f ) {
	if( !f.checkLocation("Tavern.aspx") ) return;
	f.addReplace('id="Table4"', 'id="Table4" style="white-space:nowrap;"');
	f.addReplace(/<table width="100%"/g, '<table width="100%" style="white-space:nowrap;"');
}
