(function() {
	var msgs = document.getElementById('msgs');
	var p = msgs.parentNode;
	p.innerHTML = "<br>" + p.innerHTML; 
	var d = document.getElementById('d_menu');
	d.parentNode.removeChild(d);
})();
