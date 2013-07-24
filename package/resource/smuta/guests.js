function combineGuests() {
	injectTag("td",function(node) {
		if(node.className && node.className.indexOf('frm_cell') > -1 && node.textContent.indexOf('\u0413\u043e\u0441\u0442\u044c') > -1) {
			var len = node.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
node.innerHTML = node.innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'').replace(/\)/g,'') + "<i>" + " \u0413\u043e\u0441\u0442\u0438: " + len + "</i>)";
		}

		var also = document.getElementById('lbAlsoHere');
		if(also && also.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g) != null) {
			var len = also.textContent.match(/\u0413\u043e\u0441\u0442\u044c/g).length;
			also.innerHTML = also.innerHTML.replace(/\u0413\u043e\u0441\u0442\u044c(,( )?)?/g,'') + "<i> \u0413\u043e\u0441\u0442\u0438: " + len + "</i>";
		}

	});
}

ffAddOnLoad(function() {
	combineGuests();
});
