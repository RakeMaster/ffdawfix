var persName = null;

function setPersName(name) {
	if(!persName) {
		persName = name;
		setTitle(name);
	}
}

function setTitle(name) {
	document.getElementsByTagName("title")[0].innerHTML = name;
}

function display_chat_buttons(node, flag) {
	Array.forEach(
		node.children,
		function(obj) {
			if(obj.className == "ffdawfix_chat_button") {
				obj.style.display = flag ? "" : "none";
			}
		}
	);
}

//This addes buttons for fast info and private to chat
function changeChatNode(node) {
	var fname = "ffdawfix_chat";
	if(node.parentNode.className == fname) {
		return false;
	}
	node.onmouseover = function() { display_chat_buttons(this, true); };
	node.onmouseout = function() { display_chat_buttons(this, false); };
	var div = document.createElement('span');
	div.className = node.className;
	div.onclick = node.onclick;
	div.textContent = node.textContent;
	node.className = fname;
	node.onclick = null;
	node.textContent = "";
	var sp = document.createElement('span');
	sp.textContent = " ";
	node.appendChild(sp);
	var nick = div.textContent;
	var lnick = nick.toLowerCase();
	var flag = (lnick != "клан" && lnick != "соратники" && lnick != "противники")
	var is_private = (div.className == "ci2" || div.className == "cihp");
	node.appendChild(div);
	if(flag && !is_private) {
		var im = document.createElement('img');
		im.src = "http://darkagesworld.com/vr/Images/Pvt.gif"
		im.border = 0;
		im.style.cursor = "pointer";
		//im.title = "Приват";
		im.title = "";
		eval("im.onclick = function() {addprcpt('"+nick+"')};");
		im.className = "ffdawfix_chat_button";
		im.style.display = "none";
		node.appendChild(im);
	}
	if(flag) {
		var im = document.createElement('img');
		im.src = "http://darkagesworld.com/vr/Images/Info.gif"
		im.border = 0;
		im.title = "";
		var i = createPersLink(nick);
		i.className = "ffdawfix_i";
		i.appendChild(im);
		i.className = "ffdawfix_chat_button";
		i.style.display = "none";
		node.appendChild(i);
	}
	return true;
}

//Fixing chat so you can add someones name to input on click
function fixChat() {
	var doc = top.window.frames["chouter"];
	if (doc == null || doc.document == null) {
		return false;
	}
	doc = doc.window.frames["chmsgs"];
	//public
	injectClass('ci1', function(node) {
		node.onclick = function() { addrcpt(this.textContent); };
		node.onmouseover = null;
		node.onmouseout = null;
		changeChatNode(node);
	}, doc);
	injectClass('cih', function(node) {
		node.onclick = function() { addrcpt(this.textContent); };
		node.onmouseover = null;
		node.onmouseout = null;
		changeChatNode(node);
	}, doc);
	//private
	injectClass('ci2', function(node) {
		node.onclick = function() { addprcpt(this.textContent); };
		node.onmouseover = null;
		node.onmouseout = null;
		changeChatNode(node);
	}, doc);
	injectClass('cihp', function(node) {
		node.onclick = function() { addprcpt(this.textContent); };
		node.onmouseover = null;
		node.onmouseout = null;
		changeChatNode(node);
	}, doc);
}

(function() {
	//Do message fix
	if(window.DoMessage) {
		window.DoMessage_ = window.DoMessage;
		window.DoMessage = function(m) {
			var r = window.DoMessage_(m);
			fixChat();
			return r;
		}
	}
	var mf = document.getElementById('MasterFrameset');
	if(mf) {
		mf.style.borderColor = 'black';
		mf.setAttribute('frameborder', 1);
		document.getElementById('cht').setAttribute('cols', '*,250px');
	}
	//Menu fix
	if(window.OpenMenu) {
		window.OpenMenu = function(win, evnt) {
			var div_menu = win.document.getElementById('div_menu');
			if (div_menu.style.display == 'none') {
				x = mouseX(evnt) + 'px';
				y = mouseY(evnt) + 'px';
				div_menu.style.display = "";
				div_menu.style.left = x;
				div_menu.style.position = 'absolute';
				div_menu.style.top = y;
				div_menu.innerHTML = '<div style="cursor: pointer;text-align: right" onclick="top.CloseMenu(window)"><b>[X]</b></div>' + MenuStr;
			}
		}
	}
	//Rmenu fix
	if(window.OpenRMenu) {
		window.OpenRMenu = function(win) {
			var div_menu = win.document.getElementById('div_rmenu');
			if (div_menu.style.display == 'none') {
				div_menu.style.display = "";
				if(!win.document.getElementById('close_rmenu')) {
					div_menu.innerHTML = '<div id="close_rmenu" style="cursor: pointer;text-align: right" onclick="top.CloseRMenu(window)"><b>[X]</b></div>' + div_menu.innerHTML;
				}
			}
		}
	}

	//Why did you forget to set dimentions Humpy? (px)
	if(window.MenuLnk) {
		MenuLnk = function (win, i) {
			var div_menu = win.document.getElementById('div_menu');
			var div_win = win.document.getElementById('div_win');
			var wwin = win.document.getElementById('wwin');
			div_win.style.left = "100px";
			div_win.style.top = (win.document.body.scrollTop + 20) + "px";
			wwin.style.width = (win.document.body.scrollLeft + win.document.body.clientWidth - 120) + "px";
			wwin.style.height = (win.document.body.clientHeight - 60) + "px";
			wwin.src = MenuLnks[i];
			div_menu.style.display = "none";
			div_win.style.display = "";
		}
	}

	//We HAVE to fix some functions
	if(window.addprcpt) {
		window.add_private = window.addprcpt;
		window.addprcpt = function(nick) {
			var enick = nick.replace(/\u00A0/g, " ");
			add_private(enick);
		};
	}

	if(window.addrcpt) {
		window.add_public = window.addrcpt;
		window.addrcpt = function(nick) {
			var enick = nick.replace(/\u00A0/g, " ");
			add_public(enick);
		};
	}
	//Kill this crap
	if(window.arint) {
		window.arint = function(win, t) {}
	}

	if(window.DoUserInfo) {
		var str = String(window.DoUserInfo);
		str = str.replace(/innerText/g, "textContent");
		eval("window.DoUserInfo = " + str);
	}

	if(window.RetrieveData) {
		var str = String(window.RetrieveData);
		str = str.replace(/if \(cmd\.soundUrl\)/,"if (cmd.soundUrl) {top.window.play_sound(cmd.soundUrl);} else if(false) ");
		eval("window.RetrieveData = " + str);
	}
	//The first retrive probably failed with error
	setTimeout( function() { window.RetrieveData(); }, 1000);
	return;
	//Not done yet
	var topfrm = document.getElementById("topfrm");
	topfrm.parentNode.removeChild(topfrm);
	var fs = document.createElement("frameset");
	fs.id = "extra_fs";
	fs.cols = "*,230";
	fs.appendChild(topfrm);
	var ef = document.createElement("frame");
	ef.id = "extra_frame";
	ef.name = "extra_frame";
	fs.appendChild(ef);
	var cht = document.getElementById("cht");
	cht.parentNode.insertBefore(fs, cht); 	
})();
