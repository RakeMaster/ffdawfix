function hidePopupMenu(ths) {
	var a = document.getElementById('popupfrm');
	if(!a) return;
	a.parentNode.removeChild(a);
}

ffAddOnLoad(function() {
	if(window.MenuLnk) {
		window.MenuLnk = function(win, i) {
			topfrm.document.getElementById('div_menu').style.display = "none";
			hidePopupMenu();
			switch(i) {
				case 0: lnk = "CityMap.aspx"; break;
				case 1: lnk = "BackPack.aspx"; break;
				case 2: lnk = "BackPack.aspx?__EVENTTARGET=lbBP"; break;
				case 3: lnk = "Animals.aspx"; break;
				case 4: lnk = "MagicBook.aspx"; break;
				case 5: lnk = "Friends.aspx"; break;
				case 6: lnk = "Msgs.aspx"; break;
				case 7: lnk = "UserInfoUpdate.aspx"; break;
				case 8: lnk = "UserSkills.aspx"; break;
				case 10: lnk = "InquirerList.aspx"; break;
				case 11: lnk = "Notes.aspx"; break;
				case 12: lnk = "Apps.aspx"; break;
				case 13: lnk = "Clan.aspx"; break;
			}
			var a = document.createElement('div');
			var h = window.innerHeight - 123;
			a.id = "popupfrm";
			a.style.boxShadow = "1px 1px 3px black";
			a.style.position = "absolute";
			a.style.top = "25px";
			a.style.background = "white";
			a.style.left = "80px";
			a.style.border = "1px solid";
			a.style.width = window.innerWidth - 120;
			a.style.height = window.innerHeight - 100;
			a.style.margin = "0px";
			a.innerHTML = "<div height='5%' style='height:23px;background:url(/vr/Images/WinCap.gif)'>"
				+ "<img onclick='hidePopupMenu()' src='/vr/Images/Close.gif'>"
				+ "<img onclick='hidePopupMenu()' src='/vr/Images/Close.gif' style='float:right;'>"
				+ "</div>"
				+ "<div>"
				+ "<iframe frameborder='0' style='overflow-x:hidden;' height='" + h + "px' width='100%' src='" + "/vr/Menus/" + lnk + "'></iframe>"
				+ "</div>";
			document.getElementById('MasterFrameset').parentNode.appendChild(a);
		}
	}
});