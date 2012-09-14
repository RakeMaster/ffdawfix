//timers
var timers = new Array();
var timersTimeout = null;

var ffOnLoadList = new Array();
var ffLoaded = false;

function ffAddOnLoad(f) {
	if(ffLoaded) {
		alert("onLoad already called");
		f();
	} else {
		ffOnLoadList[ffOnLoadList.length] = f;
	}
}

function ffOnLoad() {
	if( !ffLoaded ) {
		for(var i=0; i < ffOnLoadList.length; ++i) {
			ffOnLoadList[i]();
		}
		ffLoaded = true;
	}
}

window.addEventListener('load', function() ffOnLoad(), false);

function trim(str) {
	return str.replace(/^\s*([\S\s]*?)\s*$/, '$1');
}

function timerEndTimeSec(s) {
	var now = (new Date()).getTime();
	var l = s * 1000;
	return now + l;
}

function resetTimer(node) {
	updateTime(node, 0);
}

function updateTime(node, time) {
	Array.forEach(
			window.timers,
			function(obj) {
				if(obj.timer == node) {
					obj.end = time;
				}
			}
	);
}

function resetTimers() {
	window.timers = new Array();
}

function addTimer(e,time) {
	var i = window.timers.length;
	window.timers.push( {timer:e, end:time} );
}

function startTimers() {
	stopTimers();
	timersTimeout = setTimeout( function() { updateTimers(); }, 300);
}

function stopTimers() {
	if(timersTimeout) {
	 clearTimeout(timersTimeout);
	 timersTimeout = null;
	}
}

function timerFormat(t) {
	var s = t % 60;
	var m = t / 60;
	s = Math.floor(s);
	m = Math.floor(m);
	if(s < 10) s = "0" + s;
	if(m < 10) m = "0" + m;
	return m + ":" + s;
}

function updateTimers() {
	Array.forEach(
			window.timers,
			function(node) {
				var now = (new Date()).getTime();
				if(node.end == 0) return;
				var t = node.end - now;
				if(t < 0) t = 0;
				t = t / 1000;
				node.timer.textContent = timerFormat(t);
				if(t == 0) {
					node.end = 0;
				}
			}
	);
	startTimers();
}
//end of timers
function injectCSSText(txt) {
	var doc = document;
	var style = doc.createElement('style');
	style.setAttribute('type', 'text/css');
	style.textContent = txt;
	doc.getElementsByTagName('head')[0].appendChild(style);
}

function multiIdEnum(id) {
	var i = document.getElementById(id);
	var index = 1;
	while(i) {
		i.id = i.id + String(index);
		++index;
		i = document.getElementById(id);
	}
}

function multiIdIter(idpart, func) {
	var index = 1;
	var id = idpart+String(index);
	var i = document.getElementById(id);
	while(i) {
		func(i, idpart);
		++index;
		i = document.getElementById(idpart + String(index));
	}
}

function injectClass(cssClass, injector, win) {
	if(!win) win = window;
	var toDelete = new Array();
	Array.forEach(
			win.document.getElementsByClassName(cssClass),
			function(node) {
				if(node) {
					var r = injector(node);
					if(r == "delete") {
						toDelete[toDelete.length] = node;
					}
				}
			}
	);
	Array.forEach(toDelete, function(node) {
		if(node) node.parentNode.removeChild(node);
	});
}

function getClassFirst(cssClass,win) {
	if(!win) win = window;
	var a = win.document.getElementsByClassName(cssClass);
	if(a.length) {
		return a[0];
	}
	return null;
}

function injectTag(tag, injector, win) {
	if(!win) win = window;
	var toDelete = new Array();
	var doc = win;
	if(!(win instanceof HTMLDocument)) {
		doc = win.document;
	}
	Array.forEach(
			doc.getElementsByTagName(tag),
			function(node) {
				if(node) {
					var r = injector(node);
					if(r == "delete") {
						toDelete[toDelete.length] = node;
					}
				}
			}
	);
	Array.forEach(toDelete, function(node) {
		if(node) node.parentNode.removeChild(node);
	});
}

function runScript(text) {
	var doc = document;
	var script = doc.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.innerHTML = text;
	doc.getElementsByTagName('head')[0].appendChild(script);
}

function getPersLink(nick) {
	var enick = escape(nick.replace(/\u00A0/g, " "));
	return "/vr/common/FighterInfo.aspx?username=" + enick;
}

function createPersLink(nick) {
	var i = document.createElement('a');
	i.href = getPersLink(nick.trim());
	i.target = "_blank";
	return i;
}

function createPersLinkWithText(nick) {
	var i = createPersLink(nick);
	i.textContent = nick;
	return i;
}

function fixA() {
	//Some ajax forms uses links to submit form
	//It is a workaround for all of them to work correctly
	injectTag('a', function(node) {
		if(node.id) {
			var code = "window." + node.id + " = document.getElementById('" + node.id + "');";
			code += "window." + node.id + ".click = function() {window.location = document.getElementById('" + node.id + "').href};";
			eval(code);			
		}
	});
}

function fixImgTitle() {
	injectTag('img', function(node) {
		if(node.alt && !node.title) {
			node.title = node.alt;
		}
	});
}

function fixInput() {
	injectTag("input", function(node) {
		if(node.name && !node.id) {
			node.id = node.name;
		}
	});
}

ffAddOnLoad(function() {
	//What the FUCK is document.all??? Non of that thing in standard. Fuck the MS
	if(!document.all) {
		document.all = function(id, index) {
			return document.getElementById(id);
		}
	}

	//Workaroung for another FUCKING invention from Billys company
	window.showModelessDialog = function(url, loc, p) {
		p = p.replace(/dialog/g,"");
		p = p.replace(/;/g,",");
		p = p.replace(/:/g,"=");
		p = p.toLowerCase();
		window.open(url,"",p);
	}

	//Remember children: alt!=title
	//Title is what is show in the tooltip
	//And ALT is the alternative text for image (when images not loading or off)
	//Stupid MS bustards decided that it would be a great idea to have title=alt when there is no title defined
	fixImgTitle();
	//Fucking xxx
	document.frames = window.frames;
	//
	fixA();
	fixInput();
});
