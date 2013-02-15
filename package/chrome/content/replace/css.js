ru.dclan.ffdawfix.replacers.css = function( f ) {
	var r = (
		f.isPathEmpty()
		||
		f.checkLocation(".css")
		||
		f.checkLocation(".htm")
		||
		f.checkLocation(".aspx")
	);
	if( !r ) return;
	
	var helper = function(t, name) {
		t.addReplace( new RegExp("scrollbar-" + name + "-color[^;]+;", 'gi'), '');
	}

	f.addReplace( /cursor:\s*hand/gi, 'cursor: pointer');

	helper(f, 'face');
	helper(f, 'highlight');
	helper(f, 'shadow');
	helper(f, 'arrow');
	helper(f, 'track');
	helper(f, 'darkshadow');
	helper(f, 'base');
}
