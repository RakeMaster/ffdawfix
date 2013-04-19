function confirmToBuy() {
	var e = document.getElementById('btSell');
	if(e) e.click();
}

function sellAll() {
	var txt = "";
	injectTag("input", function(node) {
		if(node.type == "text") {
			var t = node.parentNode.parentNode;
			if(!t) return;
			var val = t.getElementsByTagName('td')[2].textContent.trim();
			if(val != 0) {
				txt += t.getElementsByTagName('td')[1].textContent.trim() + " " + val + "\n";
				node.value = val;
			}
		}
	});
	if(txt.trim() != "") {
		if(confirm(txt + "\n" + "Продать всё?")) {
			confirmToBuy();
		}
	}
	else {
		alert('Нет ресурсов!');
	}
}

ffAddOnLoad(function() {
	var e = document.getElementById('btSell');
	if(e && e.value == "Продать") {
		var a = document.createElement('input');
		a.type = "button";
		a.value = "Продать всё";
		a.onclick = function() {
			sellAll();
		}
		a.style.marginRight = "5px";
		e.parentNode.insertBefore(a,e);
	}
});