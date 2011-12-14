(function() {
	//Fix for incorrect frame name
	window.name = 'chouter';
	var content = null;
	injectTag("td", function(node) {
		if(node.innerHTML.search("iframe") != -1) {
			content = node.innerHTML;
		}
	});
	var t1 = document.getElementById("Table1");
	var b = document.getElementsByTagName('body')[0];
	if(content && t1 && b) {
		t1.parentNode.removeChild(t1);
		b.innerHTML += '<div style="position: absolute; width: 100%; top: 0px; background: url(/vr/uimg/ftop.gif); height:10px"></div>';
		b.innerHTML += content;
	}
	//This part is not done yet
	return;
	var t = document.createElement("div");
	t.className = "ffdawfix_timer_panel";
	var tt = document.createElement("div");
	tt.className = "ffdawfix_timer_time";
	addTimer(tt, timerEndTimeSec(0));
	window.timer = tt;
	t.appendChild(tt);

	var tmp = 15 * 3;
	for(var i = 0;i < 3; ++i) {
		var tl = document.createElement("span");
		eval("tl.onclick = function() {updateTime(window.timer,timerEndTimeSec("+tmp+"))};");
		tl.textContent = timerFormat(tmp);
		tl.className = "ffdawfix_timer_link";
		t.appendChild(tl);
		tmp -= 15;
	}

	b.appendChild(t);
	startTimers();
})();
