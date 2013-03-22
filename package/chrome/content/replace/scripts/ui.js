//var elt = x.event.srcElement;
ru.dclan.ffdawfix.replacers.ui = function( f ) {
	if(!f.checkLocation( "http://darkagesworld.com/vr/scripts/ui.js" )) return;
	f.addReplace(/var elt = x.event.srcElement/g,'if(!x.event) return;\n	var elt=x.event.srcElement');

}
