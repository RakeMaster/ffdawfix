ru.dclan.ffdawfix.replacers.citymap = function( f ) {
	if( !f.checkLocation("citymap.aspx") ) return;
	f.addReplace( /<script>top\./, '<script>parent.top.');
}