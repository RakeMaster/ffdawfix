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
	top.altMenuFlag = true;
	
	// menu.innerHTML = top.MenuStr.replace( /MenuLnk/g, "FFMenuLnk");
	menu.innerHTML = top.MenuStr;
	
	menu.style.position = "absolute";

	menu.style.display = "inline-block";
	menu.style.zIndex = 0;
	
	menu.style.left = (getX(ref) + ref.clientWidth - menu.clientWidth) + "px";
	menu.style.top = (getY(ref) + ref.clientHeight) + "px";
}

function altMenuHide() {
	var menu = document.getElementById( "div_menu" );
	top.altMenuFlag = false;
	menu.style.display = "none";
}

function altMenuCurrent() {
	var flag = (top.altMenuFlag == true);
	if(flag) {
		altMenuShow();
	} else {
		altMenuHide();
	}
}

function altMenuInvert() {
	var flag = (top.altMenuFlag == true);
	top.altMenuFlag = !flag;
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
	if(!top.FFMenuLnk) {
		top.FFMenuLnk = function(w, b) {
			var r = top.MenuLnkOrig(w, b);
			w.altMenuCurrent();
			return r;
		}
		top.MenuLnkOrig = top.MenuLnk;
		top.MenuLnk = top.FFMenuLnk;
	}
	
	altMenuCurrent();
	
	var div_win = document.getElementById( "div_win" );
	div_win.style.zIndex = 1;
});