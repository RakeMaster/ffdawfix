ru.dclan.ffdawfix.replacers.layout = function( f ) {
	if( !f.checkLocation("layout.aspx") ) return;
	f.addReplace( /frameborder="0"/gi, 'frameborder="1"');
	f.addReplace( '+Cash+', '+Number(String(Cash).replace(",",".")).toFixed(2)+');
	f.addReplace( 'Target="_blank" href="/vr/Menus/UserSkills.aspx"', 'href="javascript:getTop().MenuLnk(this, 8)"' );
}