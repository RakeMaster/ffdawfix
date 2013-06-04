//TODO: refactor
function injectCSSText(txt) {
	var doc = document;
	var style = doc.createElement('style');
	style.setAttribute('type', 'text/css');
	style.textContent = txt;
	doc.getElementsByTagName('head')[0].appendChild(style);
}

function combineGuests() {
	injectTag("td",function(node) {
		if(node.className && node.className.indexOf('frm_cell') > -1 && node.textContent.indexOf('\u0413\u043e\u0441\u0442\u044c') > -1) {
			var len = node.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
node.innerHTML = node.innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'').replace(/\)/g,'') + "<i>" + " \u0413\u043e\u0441\u0442\u0438: " + len + "</i>)";	
		}

		var also = document.getElementById('lbAlsoHere');
		if(also && also.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g) != null) { 
			var len = also.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
		also.innerHTML = also.innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'') + "<i> \u0413\u043e\u0441\u0442\u0438: " + len + "</i>";
		}

	});
}

function addUrlIcons() {
	injectTag("a", function(node) {
		if(node.href.indexOf('PMEdit.aspx') > -1 && window.location.href.search(/topic.aspx/i) != -1) {
			var e = document.createElement('img');
			e.style.marginLeft = "5px";
			e.style.cursor = "pointer";
			e.title = "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u043E\u0441\u0442";
			e.src = "resource://ffdawfix/img/url.png";
			e.onclick = function() {
				var rid = node.href.split('&')[1].split('=')[1];
				var tid = window.location.search.split('&')[0].split('=')[1];
				var lnk = "http://smuta.com/Forum/Topic.aspx?TID=" + tid + "&rid=" + rid;
				prompt(this.title, lnk);
			}
			node.parentNode.appendChild(e);
		}
	});
}

function addScrollButtons() {
	var h = window.innerHeight/2;
	var e = document.createElement('div');
	e.style.position = "fixed";
	e.style.cursor = "pointer";
	e.onmouseover = function() { e.style.marginLeft = "-1px"; }
	e.onmouseout = function() { e.style.marginLeft = "-35px"; }
	e.style.marginLeft = "-35px";
	e.style.top = h;
	e.style.left = "-1px";
	e.innerHTML = "<div style='opacity:0.4; border:1px solid black; border-radius:5px; background:white;'>"
		+ "<img onmouseout='this.parentNode.style.opacity=\"0.4\"' onmouseover='this.parentNode.style.opacity=\"1\"' onclick='window.location=\"#top\"' src='resource://ffdawfix/img/up.png'>"
		+ "</div>"
		+ "<div style='opacity:0.4; border:1px solid black; border-radius:5px; background:white;'>"
		+ "<img onmouseout='this.parentNode.style.opacity=\"0.4\"' onmouseover='this.parentNode.style.opacity=\"1\"' onclick='window.location=\"#bottom\"' src='resource://ffdawfix/img/down.png'>"
	+ "</div>";
	document.body.appendChild(e);
}

ffAddOnLoad(function() {
	if(window.panelClick)
	window.panelClick = function(ctrl) {
		var panel = ctrl.parentNode.children[1];
		if (panel) {
			panel.style.display = (panel.style.display == 'none') ? '' : 'none'; 
		}
	}

	var rep = getClassFirst('frm_repbody');
	if(rep) {
		var tr = rep.parentNode;
		var tbody = tr.parentNode;
		var trs = tbody.getElementsByTagName("tr");
		if(trs.length > 1) {
			if(trs[1] == tr) {
				rep.colSpan = 2;
			}
		}
	}

	// Emulating navigate function (used at dropdown page selector)
	if(!window.navigate) {
		window.navigate = function(loc) {
			location.href = loc;
		}
	}
	injectTag("span",function(node) {
		if(node && node.className == "lstts") {
			node.style.fontSize = "12px";
		}
	});
	if(document.body.scrollHeight > window.innerHeight) {
		addScrollButtons();
	}
	combineGuests();
	addUrlIcons();
});
