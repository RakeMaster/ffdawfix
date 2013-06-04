function createStatLine(statId, statValue, maxValue, statMin) {
	var ln = document.createElement("div");
	ln.className = statId + "Line";

	var filled = document.createElement("div");
	filled.className = statId + "Fill";
	filled.style.width = String(parseInt(statMin / maxValue * 100)) + "%";
	filled.innerHTML = "&nbsp;";

	ln.appendChild(filled);

	if(statValue > statMin) {
		var d  = statValue - statMin;
		var extra = document.createElement("div");
		extra.className = statId + "ExtFill";
		extra.style.width = String(parseInt(d / maxValue * 100)) + "%";
		extra.innerHTML = "&nbsp;";
		extra.style.display = "inline-block";
		filled.style.display = "inline-block";
		ln.appendChild(extra);
	}
	return ln;
}

function createStatValue(statId, statValue) {
	//left
	var val = document.createElement("div");
	val.id = statId;
	val.className = statId + "Value";
	val.innerHTML = statValue;
	return val;
}

function  replaceStat(statId, statIdFull, max, statMin) {
	var l = document.getElementById(statIdFull);
	if(l) {
		var parent = l.parentNode;
		var nameNode = l.previousSibling;
		var brNode1 = nameNode.previousSibling;
		var brNode2 = l.nextSibling;

		if(!nameNode.tagName) {
			parent.removeChild(nameNode);
		}
		if(brNode2.tagName && brNode2.tagName.toLowerCase() == "br") {
			parent.removeChild(brNode2);
		}
		var val = parseInt(l.textContent);
		var line = (createStatLine(statId, val, max, statMin));
		var value = (createStatValue(statId, val));
		var t = document.createElement("div");
		t.appendChild(line);
		t.appendChild(value);
		parent.replaceChild(t,l);
	}
	return null;
}

ffAddOnLoad(function() {
	var stats = new Array("lbStrength", "lbDex", "lbLuck");
	var statsMin = {}
	Array.forEach(stats, function(id) {statsMin[id] = 10000;} );

	Array.forEach(stats, multiIdEnum);
	var max = 0;
	Array.forEach(stats, function(id) {
		multiIdIter(id, function(node) {
			var v = parseInt(node.textContent);
			if(v > max) max = v;
			if(v < statsMin[id]) {
				statsMin[id] = v;
			}
		});
	});

	Array.forEach(stats, function(stat) {
		multiIdIter(stat, function(node, id) {
			replaceStat(id, node.id, max, statsMin[id]);
		});
	});
});
