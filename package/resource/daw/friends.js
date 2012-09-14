function fixFriends() {
	injectTag("span", function(node) {
		if(node.id && node.id.search("rlbUserEdit") != -1) {
			var tr = node.parentNode.parentNode;
			var name = tr.children[0];
			var n = name.textContent;
			name.innerHTML = "";
			name.appendChild(createPersLinkWithText(n));
		}
	});
}

ffAddOnLoad(function() {
	fixFriends();
});