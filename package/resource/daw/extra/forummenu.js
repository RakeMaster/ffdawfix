function backInd() {
	var sel = document.getElementById('page');
	if (sel.selectedIndex != 0) {
		sel.selectedIndex--;
	}
}

function forwardInd() {
	var sel = document.getElementById('page');
	if (sel.selectedIndex != sel.children.length - 1) {
		sel.selectedIndex++;
	}
}
function getFirstPage() {
	return 1;
}

function getLastPage(l) {
	l = document.getElementById('page').getElementsByTagName('option').length;
	return l;
}
function confirmPage(e) {
	e = document.getElementById('page');
	GoPage(e.value);
}

function getCurrentPage(e) {
	e = document.getElementById('page').value;
	return e;
}

ffAddOnLoad(function() {
	injectTag("select",function(node) {
		if(node.id == "page") {
			node.style.marginLeft = "3px";
			var a = node.parentNode;
			a.innerHTML = a.innerHTML.replace(/&nbsp;/g,'');
			var page = a.getElementsByTagName('span')[0];
			if(page.id.indexOf('PagesTotal') != -1){
				page.parentNode.removeChild(page);
			}
			var lastPage = a.getElementsByTagName('option').length;
			a.innerHTML = a.innerHTML.replace("\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430",'').replace('\u0438\u0437','');
		}
	});

	var a = document.getElementsByTagName('select');
	for(i=0; i<a.length; i++) {
		if(a[i].id == "page") {
			{
				var l = document.createElement('span');
				l.style.fontSize = "15px";
				l.innerHTML = "<b>\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430: </b>"
				+ getCurrentPage()
				+ "/" 
				+ getLastPage() 
				+ "<br>";
				a[i].parentNode.insertBefore(l,a[i]);
			}
			{ //First
				var but = document.createElement('button');
				but.innerHTML = '<img src="resource://ffdawfix/img/first.png">';
				but.style.height = "20px";
				but.type = "button";
				but.onclick = function() {
					GoPage(getFirstPage());
				}
				a[i].parentNode.insertBefore(but,a[i]);
			}
			{ //Previous
				var but = document.createElement('button');
				but.innerHTML = '<img src="resource://ffdawfix/img/prev.png">';
				but.style.height = "20px";
				but.type = "button";
				but.onclick = function() {
					backInd();
					confirmPage();
				}
				a[i].parentNode.insertBefore(but,a[i]);
			}
			{ //next
				var but = document.createElement('button');
				but.innerHTML = '<img src="resource://ffdawfix/img/next.png">';
				but.style.height = "20px";
				but.type = "button";
				but.onclick = function() {
					forwardInd();
					confirmPage();
				}
				a[i].parentNode.appendChild(but);
			}
			{ //last
				var but = document.createElement('button');
				but.innerHTML = '<img src="resource://ffdawfix/img/last.png">';
				but.style.height = "20px";
				but.type = "button";
				but.onclick = function() {
					GoPage(getLastPage());
				}
				a[i].parentNode.appendChild(but);
			}
		}
	}	
});