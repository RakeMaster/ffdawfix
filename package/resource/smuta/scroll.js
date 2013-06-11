function addScrollButtons() {
	var h = window.innerHeight/2;
	var div = document.createElement('div');
	div.style.position = "fixed";
	div.style.cursor = "pointer";
	div.style.marginLeft = "-35px";
	div.style.top = h;
	div.style.left = "-1px";
	div.onmouseover = function() { 
		div.style.marginLeft = "-1px"; 
	}
	div.onmouseout = function() {
		div.style.marginLeft = "-35px"; 
	}
	div.innerHTML = "<div style='opacity:0.4; border:1px solid black; border-radius:5px; background:white;'>"
		+ "<img onmouseout='this.parentNode.style.opacity=\"0.4\"' onmouseover='this.parentNode.style.opacity=\"1\"' onclick='window.location=\"#top\"' src='resource://ffdawfix/img/up.png'>"
		+ "</div>"
		+ "<div style='opacity:0.4; border:1px solid black; border-radius:5px; background:white;'>"
		+ "<img onmouseout='this.parentNode.style.opacity=\"0.4\"' onmouseover='this.parentNode.style.opacity=\"1\"' onclick='window.location=\"#bottom\"' src='resource://ffdawfix/img/down.png'>"
	+ "</div>";
	document.body.appendChild(div);
}

ffAddOnLoad(function() {
	if(document.body.scrollHeight > window.innerHeight) {
		addScrollButtons();
	}
});
