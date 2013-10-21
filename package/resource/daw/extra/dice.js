function setBox(prefix,num,val) {
	var e = document.getElementById(prefix+num);
	if(!e) return;
	if(e.checked != val) {
		e.checked = val;
		if(e.onclick) e.onclick();
	}
}

function setAttack(num,val) {
	setBox('rbAttack_',num,val);
}

function setDefence(num,val) {
	setBox('cblDefence_',num,val);
}

// [0,max)
function getRand(max) {
	return Math.floor(Math.random()*max);
}

function submitAttack() {
	var r = document.getElementById('EndTurn');
	r.click();
}

function randomAttack() {
	var a = getRand(4);
	var d1 = getRand(4);
	var d2 = getRand(3);
	if(d2>=d1) {
		d2++;
	}
	for(var i=0;i<4;++i) {
		setAttack(i,a==i);
		setDefence(i,(d1==i)||(d2==i));
		document.getElementById('EndTurn').focus();
	}
	var r = document.getElementById('randomButton');
	if(r.textContent == "R/") {
		r.textContent = "R\\";
	} else {
		r.textContent = "R/";
	}
}

function clearAttack() {
	for(var i=0;i<4;++i) {
		setAttack(i,false);
		setDefence(i,false);
	}
}

function insertAfter(newChild, refChild) {
	 refChild.parentNode.insertBefore(newChild,refChild.nextSibling);
}

function insertBefore(newChild, refChild) {
	 refChild.parentNode.insertBefore(newChild,refChild);
}

ffAddOnLoad(function() {
	var r = document.getElementById('EndTurn');
	if(!r) return;
	{
		var b = document.createElement("span");
		b.style.textDecoration = "underline";
		b.style.fontWeight = "bold";
		b.style.color = "black";
		b.style.cursor = "pointer";
		b.style.marginLeft = "10px";
		b.style.fontSize = "16px";
		b.textContent = "C";
		b.title = "Сбросить удар";
		b.onclick = function() { clearAttack(); setAttackPointImages(); };
		insertAfter(b,r);
	}
	{
		var b = document.createElement("span");
		b.style.textDecoration = "underline";
		b.style.fontWeight = "bold";
		b.style.color = "red";
		b.style.cursor = "pointer";
		b.style.marginLeft = "10px";
		b.style.fontSize = "16px";
		b.textContent = "R/";
		b.title = "Случайный удар";
		b.id = "randomButton";
		b.onclick = function() { randomAttack(); setAttackPointImages();};
		insertAfter(b,r);
	}
});
