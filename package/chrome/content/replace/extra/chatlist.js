ru.dclan.ffdawfix.replacers.chatlist = {
	check: function(url) {
		var r = (
				ru.dclan.ffdawfix.utils.getBool("chatList") 
				&&
			(url.search("http://darkagesworld.com/vr/cht/pplouter3.htm") == 0)
		);
		
		return r;
	},
	replace: function(text) {
		text = text.replace( /scrolling="yes"/, 
				'scrolling="no"'
				);
		return text;
	}
};
