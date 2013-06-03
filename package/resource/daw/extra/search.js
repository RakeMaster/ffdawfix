function injectGoogleSearchLink() {
	var a = document.getElementById('Menu_lbMainMenu');
	if(!a) var a = document.getElementById('Menu1_lbMainMenu');
	if(!a) return;
	a = a.getElementsByTagName('a')[2];
	if(!a) return;
	var e = document.createElement('a');
	e.onclick = function() {
		if(checkAnchor() == "google") {
			window.location.reload();
		}
	}
	e.href = "http://smuta.com/Forum/search.aspx#google";
	e.innerHTML = '\u041f\u043e\u0438\u0441\u043a \u043e\u0442 <span style="font-family: Catull BQ;"><font color="blue">G</font><font color="red">o</font><font color="orange">o</font><font color="blue">g</font><font color="green">l</font><font color="red">e</font></span>' + '<br>';
	a.parentNode.insertBefore(e, a);
}

ffAddOnLoad(function() {
	if(checkAnchor() == "google") {
		var s = document.createElement('script'); 
		s.type = 'text/javascript'; 
		s.async = true;
 		s.src = "resource://ffdawfix/cse.js";
		document.head.appendChild(s);
		document.getElementsByTagName('title')[0].innerHTML = "\u041f\u043e\u0438\u0441\u043a \u043e\u0442 Google";

		var a = document.getElementById('btSearch');
		if(a) {
			a.parentNode.innerHTML = '<gcse:search></gcse:search>';
		}
	}
	injectGoogleSearchLink();
});