function addUrlIcons() {
	injectTag("a", function(node) {
		if(node.href.indexOf('PMEdit.aspx') > -1) {
			var e = document.createElement('img');
			e.style.marginLeft = "5px";
			e.style.cursor = "pointer";
			e.title = "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u043E\u0441\u0442";
			e.src = "resource://ffdawfix/img/url.png";
			e.onclick = function() {
				var rid = node.href.split('&')[1].split('=')[1];
				var tid = window.location.search.split('&')[0].split('=')[1];
				var lnk = "http://smuta.com/Forum/Topic.aspx?TID=" + tid + "&rid=" + rid;
				prompt(this.title, lnk);
			}
			node.parentNode.appendChild(e);
		}
	});
}

ffAddOnLoad(function() {
	addUrlIcons();
});