function giftLength() {
	var m = document.body.textContent.match(/Выбросить/g);
	if(m) return m.length;
	else return 0;
}

function closedGiftLength() {
	var m = document.body.textContent.match(/Открыть/g);
	if(m) return m.length;
	else return 0;
}

function openedGiftLength() {
	return giftLength() - closedGiftLength();
}

function setActiveTab() {
	var a = document.getElementById('giftgroups').getElementsByTagName('a');
	var tab = "";
	if(window.location.href.search("#") == -1) {
		a[0].style.fontWeight = "bold";
	}
	else {
		for(i=0;i<a.length;i++) {
			if(a[i].href.split('#')[1] == window.location.href.split("#")[1]) {
				a[i].style.fontWeight = "bold";
				break;
			}
		}
	}
}

ffAddOnLoad(function() {
	var a = document.getElementById('lbGifts');
	if(!a || a.style.fontWeight != "bold") return;
		
	var anc = window.location.href.split("#")[1];
	var bp = document.getElementById('BackPack');
	if(!bp) return;
	if(anc) {
		bp.action = "BackPack.aspx" + "#" + anc;
	}
	else {
		bp.action = "BackPack.aspx";
	}
	
	if(checkAnchor() == "closed") {
		injectTag('span', function(node) {
			if(node.id.search('rlbCmd2') > -1) { 
				var t = node.parentNode.parentNode;
				if(t.getElementsByTagName('span')[1].textContent.trim() == "Выбросить") {
					t.style.display = "none";
				}
			}
		});
	}

	if(checkAnchor() == "opened") {
		injectTag('span', function(node) {
			if(node.id.search('rlbCmd1') > -1) { 
				node.parentNode.parentNode.style.display = "none";
			}
		});
	}

	var e = document.createElement('span');
	e.innerHTML = "<div id='giftgroups'>"
		+ "<a href='/VR/Menus/BackPack.aspx?BackPackState=Gifts#all'>Все"
			+ "<i>("
			+ giftLength()
			+ ")</i>"
		+ "</a>"
		+ "<a style='margin:0px 5px' href='/Vr/Menus/BackPack.aspx?BackPackState=Gifts#opened'>Открытые" 
			+ "<i>(" 
			+ openedGiftLength() 
			+ ")</i>" 
		+ "</a>"
		+ "<a href='/vR/Menus/BackPack.aspx?BackPackState=Gifts#closed'>Не открытые"
			+ "<i>(" 
			+ closedGiftLength()
			+ ")</i>" 
		+ "</a>"
		+ "</div>";
	a.nextSibling.nextSibling.nextSibling.appendChild(e);
	setActiveTab();
});
