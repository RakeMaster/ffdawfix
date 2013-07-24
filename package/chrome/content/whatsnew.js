(function() {
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", 'chrome://ffdawfix/content/whatsnewtxt.js', false );
	xmlHttp.send( null );
	var txt = xmlHttp.responseText;

	var parts = txt.split('\n').filter(function(item){return item});
	var html = '<html:ul><html:li>' 
		+ parts.join('.</html:li><html:li>') 
		+ '.</html:li></html:ul>';

	document.getElementById('text').innerHTML = html;

	Components.utils.import("resource://gre/modules/AddonManager.jsm");
	AddonManager.getAddonByID("ffdawfix@dclan.ru", function(addon) {
		document.getElementById('version').textContent = "Версия " + addon.version;
	});
})();
