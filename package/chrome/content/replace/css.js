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
	f.addReplace(/FILTER: Glow\(Color=lightyellow, Strength=2\)/gi, 'text-shadow: #FFFFE0 0px 0px 2px');
	f.addReplace(/padding: 0,3,0,3/gi, 'padding: 0px 3px 0px 3px');
	f.addReplace(/filter:(.*)alpha\(opacity=[0-9]+\);/gi, '');
	f.addReplace(/FILTER: Glow\(Color=Black, Strength=3\); COLOR: lightyellow/gi, 'text-shadow: #000000 0px 0px 3px; color: #FFFFE0;');
	f.addReplace(/ ZORDER: [0-9]+;/gi, '');
	f.addReplace(/FILTER: Glow\(Color=Black, Strength=2\) Alpha \(Opacity=80\)/gi,'opacity:0.8; text-shadow: #000000 0px 0px 2px');
	f.addReplace(/FILTER: Glow\(Color=Black, Strength=2\)/gi, 'text-shadow: #000000 0px 0px 2px');

	helper(f, 'face');
	helper(f, 'highlight');
	helper(f, 'shadow');
	helper(f, 'arrow');
	helper(f, 'track');
	helper(f, 'darkshadow');
	helper(f, 'base');
}
