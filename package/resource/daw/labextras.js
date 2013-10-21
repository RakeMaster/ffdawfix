ffAddOnLoad(function() {
	var a = document.getElementById('edSCode');
	if(!a) var a = document.getElementById('ctl00_PageContent_edSCode');
	if(!a) return;
	a.focus();
	a.onkeypress = function(event) {
		if(event.keyCode == 13) {
			var subm = document.getElementById('btDig');
			if(!subm) var subm = document.getElementById('btDig2');
			if(!subm) var subm = document.getElementById('ctl00_PageContent_btDig2');
			if(!subm) return;
			subm.click();
		}
	}
	
	var inp = document.getElementsByTagName('input');
	for(i=0,l=0,index=0;i<inp.length;i++) {
		if(inp[i].type == "radio") {
			l++;
			index = i;
		}
	}
	if(l == 1) {
		inp[index].checked = true;
	}
});
