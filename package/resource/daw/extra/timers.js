//Like at arena
function timerEndTime(text) {
	var now = (new Date()).getTime();
	var t = text.split(":");
	var m = parseInt(t[0]);
	var s = parseInt(t[1]);
	var left = m*60+s*1;
	if(!left) left = 0;
	return timerEndTimeSec(left);
}

//Like at squest or locations
function timerEndTime2(text) {
	var m = 0;
	var s = 0;
	var regex;
	regex = /(\d+)\s+мин/;
	var t1 = regex.exec(text);
	if(t1) m=parseInt(t1[1]);
	regex = /(\d+)\s+сек/;
	t2 = regex.exec(text);
	if(t2) s = parseInt(t2[1]);
	if(!t1 && !t2) return -1;
	return timerEndTimeSec(m * 60 + s);
}

function injectTimers() {
	//Live timers addon
	resetTimers();
	injectTag("b", function(node) {
		var t = node.textContent;
		if(t.length == 5 && t.search(":") != -1) {
			addTimer(node, timerEndTime(t));
		}
	});
	var lbTta = document.getElementById('lbTimeTillAttack');
	if(lbTta) {
		addTimer(lbTta, timerEndTime2(lbTta.textContent));
	}
	var lbStat = document.getElementById('lbStatus');
	if(lbStat) {
		var regex = /[^0-9]+/
		var txt = lbStat.textContent;
		var m = regex.exec(txt);
		if(m && m[0] != txt) {
			var left = timerEndTime2(txt);
			if(left != -1) {
				var regex = /(\d+)\s+мин/;
				txt = txt.replace(regex,"");
				regex = /(\d+)\s+сек/;
				txt = txt.replace(regex,"");
				regex = /\.\s*$/;
				txt = txt.replace(regex,"");
				lbStat.textContent = txt;
				var statTime = document.createElement("span");
				lbStat.appendChild(statTime);
				addTimer(statTime, left);
			}
		}
	}
}

function injectAndStartTimers() {
	injectTimers();
	startTimers();
}

(function() {
	injectAndStartTimers();
	addAjaxHandler(injectAndStartTimers);
})();
