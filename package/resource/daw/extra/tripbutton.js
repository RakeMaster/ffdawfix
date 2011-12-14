(function() {
	var d = document.getElementById('Head_pnlMail2');
	if(!d) d = document.getElementById('ctl00_Head_pnlMail2');
	if(!d) d = document.getElementById('ctl00_Head_pnlMail1');
	if(!d) d = document.getElementById('Head_pnlMail1');
	if(d) {
		d.style.whiteSpace = "nowrap";
		{//Trip
			var a = document.createElement("a");
			a.href = "/vr/Places/Group.aspx?Create=1";
			a.textContent = "Поход";
			a.style.fontSize = "20pt";
			a.style.color = "red";
			a.style.fontWeight = "bold";
			d.appendChild(a);
		}
		{//Townmap
			var a = document.createElement("span");
			a.onclick = function() { top.MenuLnk(window, 0); };
			a.textContent = "Карта";
			a.style.textDecoration = "underline";
			a.style.cursor = "pointer";
			a.style.fontSize = "20pt";
			a.style.color = "white";
			a.style.fontWeight = "bold";
			d.appendChild(a);
		}		
	}
})();
