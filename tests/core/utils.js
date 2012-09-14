include("../package/chrome/content/core/namespace.js");
include("../package/chrome/content/core/utils.js");

createTest( "Utils", {
testEncode: function() {
	this.assertEquals(ru.dclan.ffdawfix.utils.encode("123abc"), "123abc");
},
testTrimLoc: function() {
	var tl = ru.dclan.ffdawfix.utils.trimLocation;
	this.assertEquals(tl("hello"), "hello");
	this.assertEquals(tl("hello?wold"), "hello");
	this.assertEquals(tl("hello#wold"), "hello");
	this.assertEquals(tl("one?two#tree"), "one");
	this.assertEquals(tl("one#two?tree"), "one");
	this.assertEquals(tl("one#two#tree"), "one");
}
});