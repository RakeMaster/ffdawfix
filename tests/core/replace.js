include("../package/chrome/content/core/namespace.js");
include("../package/chrome/content/core/utils.js");
include("../package/chrome/content/core/replace.js");

// Replace engine checks
createTest( "Replace", {
testReplace: function() {
	var r = new ru.dclan.ffdawfix.replace.Replacer();
	this.assert( !r.needReplace() );
	r.addCSS("mycss.css");
	this.assert( r.needReplace() );
	this.assertEquals( r.replace("text"), "text");
	this.assertEquals( r.replace("<head></head>"), '<head><link rel="stylesheet" type="text/css" href="resource://ffdawfix/mycss.css" /></head>');
	r.addJS("js1.js");
	r.addJS("js3.js");
	r.addJS("js2.js");
	this.assertEquals( r.replace("<head></head>"), '<head><link rel="stylesheet" type="text/css" href="resource://ffdawfix/mycss.css" /><script type="text/javascript" src="resource://ffdawfix/js1.js"></script><script type="text/javascript" src="resource://ffdawfix/js3.js"></script><script type="text/javascript" src="resource://ffdawfix/js2.js"></script></head>');
	
	r = new ru.dclan.ffdawfix.replace.Replacer();
	this.assert( !r.needReplace() );
	r.addJSText("alert('hello!');");
	this.assert( r.needReplace() );
	this.assertEquals( r.replace("<head></head>"), '<head><script type="text/javascript"><!--\nalert(\'hello!\');\n--></script></head>');
	
	r = new ru.dclan.ffdawfix.replace.Replacer("TheUrl");
	this.assert( !r.needReplace() );
	r.addReplace("hello", "hello.world");
	this.assert( r.needReplace() );
	this.assertEquals( r.replace("hello"), 'hello.world');
}
});