function fixLists() {
	injectClass('list',function(node) {
		node.onmouseover = null;
		node.onmouseout = null;
	});
	injectClass('listrow',function(node) {
		node.onmouseover = function() {
			this.className = 'listrowsel';
		}
		node.onmouseout = function() {
			this.className = 'listrow';
		}
	});
}

function renewImage() {
	//ctl00_PageContent_imgReg
	//alert("Called");
	var i = document.getElementById("ctl00_PageContent_imgReg");
	if(i) {
		var src = i.src;//"/vr/common/imgcache.aspx"
		var regex = /([^\?]+)/;
		var match = regex.exec(src);
		if(!match) return;
		var now = (new Date()).getTime();
		src = match[1]+"?"+now;
		//alert(src);
		i.src = src;		
	}
}

function correctOnMouseOut(event) {
	e = event.toElement || event.relatedTarget;
	if (e.parentNode == this || e == this) {
		return;
	}
	this.oldOnMouseOut(event);
}


(function() {
	//Fix menu
	var menu_ref = document.getElementById('menu_ref');
	if(menu_ref) {
		var div_menu = document.getElementById('div_menu');

		var out = menu_ref.onmouseout;
		var over = menu_ref.onmouseover;

		menu_ref.onmouseout = null;
		div_menu.oldOnMouseOut = out;
		div_menu.onmouseout = correctOnMouseOut;
	}

	fixLists();
	renewImage();

	addAjaxHandler(fixLists);
	addAjaxHandler(fixA);
	addAjaxHandler(renewImage);
})();
