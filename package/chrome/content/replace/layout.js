ru.dclan.ffdawfix.replacers.layout = function( f ) {
	if( !f.checkLocation("layout.aspx") ) return;
	f.addReplace( /frameborder="0"/gi, 'frameborder="1"');
	f.addReplace( '+Cash+', '+Number(String(Cash).replace(",",".")).toFixed(2)+');
	f.addReplace( 'Target="_blank" href="/vr/Menus/UserSkills.aspx"', 'href="javascript:getTop().MenuLnk(this, 8)"' );

	if( !f.checkFlag( "chatInp" ) ) return;
	f.addReplace( '69%,31%', '65%,31%,4%' );
	f.addReplace( ' rows="*,32"', '' );
	f.addReplace( /<frame name="ChInp".*>/, '');
	f.addReplace( '<noframes>', '<frame name="ChInp" src="Cht/ChInp3.htm?7" marginwidth="0" scrolling="no"><noframes>');
}
