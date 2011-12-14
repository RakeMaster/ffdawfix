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

(function() {
	//Fix clock
	if(window.clock) {
		window.clock = function() {
			var dte = new Date();
			dte.setTime(dte.getTime() - top.clockCorrection);
			var h = dte.getHours();
			var m = dte.getMinutes();
			var s = dte.getSeconds();
			if (m <= 9) m = '0' + m;
			if (s <= 9) s = '0' + s;
			var time = h + ':' + m + ':' + s;
			document.getElementById('timespan').innerHTML = time;
		}
	}
	//Fix menu
	var menu_ref = document.getElementById('menu_ref');
	if(menu_ref) {
		var div_menu = document.getElementById('div_menu');

		var out = menu_ref.onmouseout;
		var over = menu_ref.onmouseover;

		menu_ref.onmouseout  = null;
		menu_ref.onmouseover = null;

		menu_ref.onclick = over;

		div_menu.onmouseout  = null;
		div_menu.onmouseover = null;
	}

	fixLists();
	renewImage();

	addAjaxHandler(fixLists);
	addAjaxHandler(fixA);
	addAjaxHandler(renewImage);
})();
