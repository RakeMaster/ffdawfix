function addInput() {
	var conf = document.getElementById('ctl00_PageContent_pnlBuyConfirm');
	if(!conf) return;
	var tb = conf.getElementsByTagName('tbody')[1];
	if(!tb) return;
	var tr = tb.getElementsByTagName('tr')[1];
	if(!tr) return;
	var pn = tr.parentNode;
	if(!pn) return;
	var a = document.createElement('tr');
	a.innerHTML = "<td>Количество:</td><td><input id='giftlen' onkeypress='return isNumberKey(event)' type='text' value='1' size='3'></td>";
	a.type = "text";
	pn.appendChild(a);
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
	return true;
}

function sendGifts(uname, len) {
	var nicks = new Array(len + 1).join(uname + ",");
	var nicks = nicks.slice(0, -1);
     
	var s = document.getElementById('ctl00_PageContent_tbSendTo');
	s.value = nicks;
	document.getElementById('ctl00_PageContent_YesBuyBtn').click();
}

ffAddOnLoad(function() {
	addInput();
	
	var snd = document.getElementById('ctl00_PageContent_YesBuyBtn');
	snd.onclick = function() {
		var dest = document.getElementById('ctl00_PageContent_tbSendTo');
		var desttxt = dest.value.split(",")[0];
		var len = document.getElementById('giftlen').value;
		sendGifts(desttxt, Number(len));
	}
});
