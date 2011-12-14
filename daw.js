function getMaxStat() {
	while(document.getElementById)
	document.getElementById();
	replaceStat("lbStrength","red",100);
}

function replaceStat(statName,color,max) {
	var l = document.getElementById(statName);
	if(l) {
		var parent = l.parentNode;
		var nameNode = l.previousSibling;
		var brNode = nameNode.previousSibling;
		if(!nameNode.tagName) {
			parent.removeChild(nameNode);
		}
		if(brNode.tagName.toLowerCase() == "br") {
			parent.removeChild(brNode);
		}
		var val = parseInt(l.textContent);
		var el = createStatBar(statName, color , val, max);
		parent.replaceChild(el,l);
		return el;
	}
	return null;
}

function createStatBar(statId, statColor, statValue, maxValue) {
		var bar = document.createElement("div");
		bar.className = "ffdawfix_stat_div";
		bar.innerHTML = "&nbsp;";
		//left
		var val = document.createElement("div");
		val.id = statId;
		val.className= "ffdawfix_stat_value";
		val.innerHTML = statValue;
		//right
		var line = document.createElement("div");
		line.className="ffdawfix_stat_line";
		line.style.border="1px solid "+statColor;

		var filled = document.createElement("div");
		filled.style.backgroundColor = statColor;
		filled.className = "ffdawfix_stat_fill";
		filled.style.width=String(statValue/maxValue*100)+"%";
		filled.innerHTML="&nbsp;";

		line.appendChild(filled);
		bar.appendChild(val);
		bar.appendChild(line);
		return bar;	
}

(function() {
		//
		enumerateId("lbStrength");
		enumerateId("lbDex");
		enumerateId("lbLuck");
		var max = 0;
		iterateOverEnum("lbStrength", function(node) {
			var i = parseInt(node.textContent);
			if(i>max) max = i;
		});
		iterateOverEnum("lbDex", function(node) {
			var i = parseInt(node.textContent);
			if(i>max) max = i;
		});
		iterateOverEnum("lbLuck", function(node) {
			var i = parseInt(node.textContent);
			if(i>max) max = i;
		});
		//XXX
		iterateOverEnum("lbStrength", function(node) {
			var f = replaceStat(node.id,"red",max);
			if(f) {
				var pr = f.previousSibling;
				if(pr.tagName.toLowerCase()=="strong") {
					pr.parentNode.removeChild(pr);
				}
			}
		});
		iterateOverEnum("lbDex", function(node) {
			replaceStat(node.id,"green",max);
		});
		iterateOverEnum("lbLuck", function(node) {
			replaceStat(node.id,"blue",max);
		});
})();
