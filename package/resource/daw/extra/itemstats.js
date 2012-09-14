function createItemStat(bar, statValue, maxValue, critical) {
		var p = 100-parseInt(statValue * 100 / maxValue);
		var statColor = "green";
		if(critical) statColor = "red";
		//left
		var val = document.createElement("div");
		val.className= "ffdawfix_stat_value";
		val.innerHTML = "[" + statValue + "/" + maxValue + "]";
		//right
		var line = document.createElement("div");
		line.className = "ffdawfix_stat_line_short";
		line.style.border = "1px solid " + statColor;

		var filled = document.createElement("div");
		filled.style.backgroundColor = statColor;
		filled.className = "ffdawfix_stat_fill";
		filled.style.width = String(p) + "%";
		filled.innerHTML = "&nbsp;";

		line.appendChild(filled);
		bar.appendChild(val);
		bar.appendChild(line);
}

ffAddOnLoad(function() {
	injectTag("td",function(node) {
		var regex = /^\s*\[(\d+)\/(\d+)\]\s*$/;
		var r = regex.exec(node.textContent);
		if(!r) return;
		var critical = (node.innerHTML.search("red") != -1);
		node.style.width = "100px";
		node.style.position = "relative";
		node.style.textAlign = "left";
		var l = parseInt(r[1]);
		var h = parseInt(r[2]);
		node.innerHTML = "";
		createItemStat(node, l, h, critical);
	});
});
