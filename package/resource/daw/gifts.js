ffAddOnLoad(function() {

	var inf = document.getElementById('Stuff_ctl01_lbItemInfo');
	if(inf){
		inf.parentNode.style.width="400px";
		var table = document.getElementById('Table1');
		var div = table.getElementsByTagName('div');
		for(i=0;i<div.length;i++){
			var b = div[i].children[0];
			var n = b.textContent;
			b.innerHTML="";
			b.appendChild(createPersLinkWithText(n));

		}
	}

});