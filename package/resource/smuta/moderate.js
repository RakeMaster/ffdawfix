ffAddOnLoad(function() {
	injectTag('a', function(node) {
		if(node.href.search('/Forum/Topic.aspx') != -1) {
				node.href += "&page=99999#bottom";
		}
	});
});
