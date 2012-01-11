include("../package/chrome/content/core/namespace.js");
include("../package/chrome/content/core/utils.js");

var TestUtils = TestSuite;

TestUtils.prototype.testEncode = function() {
	this.assertEquals(ru.dclan.ffdawfix.utils.encode("123abc"), "123abc");
}

TestUtils.prototype.testIsLoginPage = function() {
	var f = ru.dclan.ffdawfix.utils.isLoginPage;
	this.assert(f("http://darkagesworld.com/vr/Default.aspx"));
	this.assert(f("http://darkagesworld.com/vr/default.aspx"));
	this.assert(f("http://darkagesworld.com/vr/Default.ASPX"));
	this.assert(f("http://darkagesworld.com/VR/Default.aspx"));
	this.assert(!f("http://darkagesworld.com/VR/Bad.aspx"));
}
