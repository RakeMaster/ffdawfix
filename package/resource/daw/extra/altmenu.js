function getY( oElement )
{
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function getX( oElement ) {
	var iReturnValue = 0;
	while( oElement != null ) {
		iReturnValue += oElement.offsetLeft;
		oElement = oElement.offsetParent;
	}
	return iReturnValue;
}

function altMenuShow() {
	var ref = document.getElementById( "menu_ref" );
	if(!ref) return;
	var menu = document.getElementById( "div_menu" );
	if(!menu) return;
	getTop().altMenuFlag = true;
	
	// menu.innerHTML = getTop().MenuStr.replace( /MenuLnk/g, "FFMenuLnk");
	menu.innerHTML = getTop().MenuStr;
	
	menu.style.position = "absolute";

	menu.style.display = "inline-block";
	menu.style.zIndex = 0;
	
	menu.style.left = (getX(ref) + ref.clientWidth - menu.clientWidth) + "px";
	menu.style.top = (getY(ref) + ref.clientHeight) + "px";
}

function altMenuHide() {
	var menu = document.getElementById( "div_menu" );
	getTop().altMenuFlag = false;
	menu.style.display = "none";
}

function altMenuCurrent() {
	var flag = (getTop().altMenuFlag == true);
	if(flag) {
		altMenuShow();
	} else {
		altMenuHide();
	}
}

function altMenuInvert() {
	var flag = (getTop().altMenuFlag == true);
	getTop().altMenuFlag = !flag;
	altMenuCurrent();
}

ffAddOnLoad(function() {
	var ref = document.getElementById( "menu_ref" );
	if(!ref) return;
	var menu = document.getElementById( "div_menu" );
	if(!menu) return;
	
	ref.onmouseover = null;
	ref.onmouseout = null;
	ref.onclick = function() { altMenuInvert(); };
	menu.onmouseover = null;
	menu.onmouseout = null;
	
	// Install only once
	if(!getTop().FFMenuLnk) {
		getTop().FFMenuLnk = function(w, b) {
			var r = getTop().MenuLnkOrig(w, b);
			w.altMenuCurrent();
			return r;
		}
		getTop().MenuLnkOrig = getTop().MenuLnk;
		getTop().MenuLnk = getTop().FFMenuLnk;
	}
	
	altMenuCurrent();
	
	var div_win = document.getElementById( "div_win" );
	div_win.style.zIndex = 1;
});