ru.dclan.ffdawfix.replacers.css = function( f ) {
	var r = (
		f.url.search(".css") != -1
		||
		f.url.search(".htm") != -1
		||
		f.url.search(".aspx") == f.url.length - 5
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
