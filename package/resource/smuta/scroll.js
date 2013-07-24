function addScrollButtons() {
	var h = window.innerHeight/2;
	var div = document.createElement('div');
	div.style.position = "fixed";
	div.style.cursor = "pointer";
	div.style.top = h;
	div.style.left = "-1px";
	div.innerHTML = "<div>"
		+ "<a href='#top'><img class='scrollbtn' src='resource://ffdawfix/img/up.png'></a>"
		+ "</div>"
		+ "<div>"
		+ "<a href='#bottom'><img class='scrollbtn' src='resource://ffdawfix/img/down.png'></a>"
		+ "</div>";
	document.body.appendChild(div);
}

ffAddOnLoad(function() {
	if(document.body.scrollHeight > window.innerHeight) {
		addScrollButtons();
	}
});
