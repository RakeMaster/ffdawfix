include("../package/chrome/content/core/namespace.js");
include("../package/chrome/content/core/replacers.js");
include("../package/chrome/content/replace/citymap.js");

createTest( "Citymap", {
testReplace: function() {
	this.assertEquals(ru.dclan.ffdawfix.replacers.citymap.replace("123abc"), "123abc");
	this.assertEquals(ru.dclan.ffdawfix.replacers.citymap.replace("LEFT=10px;LEFT=2222px;"), "left: 10px;left: 2222px;");
}

});


