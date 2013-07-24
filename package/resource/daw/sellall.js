function confirmToBuy() {
	var e = document.getElementById('btSell');
	if(e) e.click();
}

function sellAll() {
	var txt = "";
	var totalPrice = 0;
	injectTag("input", function(node) {
		if(node.type == "text") {
			var nodeParent = node.parentNode.parentNode;
			if(!nodeParent) return;
			var amount = nodeParent.getElementsByTagName('td')[2];
			if(!amount) return;
			var amountTxt = amount.textContent.trim();
			if(amountTxt != 0) {
				var resPrice = nodeParent.getElementsByTagName('td')[5];
				if(!resPrice) return;
				var resPriceTxt = resPrice.textContent.replace(",", ".");
				totalPrice +=  Number(resPriceTxt) * Number(amountTxt);
				txt += nodeParent.getElementsByTagName('td')[1].textContent.trim() + " " + amountTxt + "\n";
				node.value = amountTxt;
			}
		}
	});
	if(txt.trim() != "") {
		if(confirm(txt + "\n" + "Продать всё за " + totalPrice.toFixed(2) + " дт?")) {
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
