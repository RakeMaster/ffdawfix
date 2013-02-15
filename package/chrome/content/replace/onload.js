ru.dclan.ffdawfix.replacers.onload = function( f ) {
	if( !f.checkLocation(".htm") && !f.checkLocation(".aspx") && !f.isPathEmpty() ) return;
		f.addJSText( 
 'var ffOnLoadList = new Array();\n'
+'var ffLoaded = false;\n'
+'function ffAddOnLoad(f) {\n'
+'	if(ffLoaded) {\n'
+'		f();\n'
+'	} else {\n'
+'		ffOnLoadList[ffOnLoadList.length] = f;\n'
+'	}\n'
+'}\n'
+'function ffOnLoad() {\n'
+'	if( !ffLoaded ) {\n'
+'		for(var i=0; i < ffOnLoadList.length; ++i) {\n'
+'			ffOnLoadList[i]();\n'
+'		}\n'
+'		ffLoaded = true;\n'
+'	}\n'
+'}\n'
+'window.addEventListener(\'load\', function() ffOnLoad(), false);');
}