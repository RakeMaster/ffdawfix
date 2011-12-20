function stop_sound() {
	var s = get_sound_place();
	if(s) {
		s.innerHTML = "";
	}
}

function play_sound(src) {
	stop_sound();
	var s = get_sound_place();
	if(!s) {
		s = install_sound();
	}
	s.innerHTML = '<embed src="' + src + '" type="audio/wav" autostart="true" loop="false" mastersound hidden></embed>';
}

function get_sound_place() {
	var doc = top.window.frames["chouter"].document;
	var s = doc.getElementById("sound_place");
	return s;
}

function install_sound() {
	var doc = top.window.frames["chouter"].document;
	var sp = null;
	injectTag("body", function(node) {
		sp = document.createElement("div");
		sp.id = "sound_place";
		sp.style.position = "absoulte";
		sp.style.top = 0;
		sp.style.left = 0;
		node.appendChild(sp);
	}, doc);
	return sp;
}
