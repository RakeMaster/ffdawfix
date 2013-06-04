ffAddOnLoad(function() {
	injectTag("tr",function(node) {
		if(node.getAttribute('class') && node.getAttribute('class').replace(/[0-9]/g,'') == "ShopStuff" && document.getElementById('pnlHelpInBattle')) {
			var n = node.getElementsByTagName('td')[0];
			var t = n.textContent.trim();
			n.innerHTML = "";
			n.style.paddingLeft = "6px";
			n.appendChild(createPersLinkWithText(t));

		}
	});
});