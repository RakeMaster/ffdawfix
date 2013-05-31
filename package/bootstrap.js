const Cu = Components.utils;
const Ci = Components.interfaces;
const Cc = Components.classes;

function Set() {
	this.content = {};
}

Set.prototype.add = function(val) {
	this.content[val]=true;
}
Set.prototype.remove = function(val) {
	delete this.content[val];
}
Set.prototype.has = function(val) {
	return (val in this.content);
}

Cu.import("resource://gre/modules/Services.jsm");

function getResource() {
	return Services.io.getProtocolHandler("resource").QueryInterface(Ci.nsIResProtocolHandler);
}

//Store all variables of loaded scripts
var pluginContext = {};

function log(message) {
	var consoleService = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);  
	consoleService.logStringMessage(message);
}

function setLoaded( ctx, path ) {
	if( !ctx.loadedScripts ) {
		ctx.loadedScripts = new Set();
	} else if( ctx.loadedScripts.has( path ) ) {
		return false;
	}
	ctx.loadedScripts.add( path );
	return true;
}

// Load script from chrome/content folder
function loadScript( ctx, path) {
	if( !setLoaded( ctx, path ) ) return false;
	Services.scriptloader.loadSubScript( "chrome://ffdawfix/content/" + path, ctx, "UTF-8" );
	log( path );
	return true;
}

function deinitResources() {
	getResource().setSubstitution("ffdawfix", null);
}

// Make resources from "resource" floder visible at "resource://ffdawfix/resource/" url
function initResources( installPath ) {
	let alias = Services.io.newFileURI( installPath );
	if (!installPath.isDirectory()) {
		alias = Services.io.newURI("jar:" + alias.spec + "!/resource/", null, null);
	} else {
		alias = Services.io.newURI( alias.spec + "/resource/" );
	}
	log ( alias.spec );
	getResource().setSubstitution("ffdawfix", alias);
}

function unloadScripts() {
	pluginContext = {}; // drop all variables of loaded scripts
}

function loadScripts() {
	unloadScripts();

	var load = loadScript.bind( this, pluginContext );
	pluginContext.require = load;
	pluginContext.logMsg = log.bind( this );

	load("core/onload.js");
	load("core/replace.js");

	// REPLACE section
	load("replace/citymap.js");
	load("replace/maze.js");
	load("replace/smuta.js");
	load("replace/onload.js");
	load("replace/smiles.js");
	load("replace/timespan.js");
	load("replace/css.js");
	load("replace/inject.js");
	load("replace/send_message.js");
	load("replace/layout.js");
	load("replace/top.js");
	load("replace/all.js");
	load("replace/clan.js");
	load("replace/info.js");
	load("replace/scripts/layout.js");
	load("replace/scripts/chinp.js");
	load("replace/scripts/ui.js");
	load("replace/pmmsgs.js");
	load("replace/clock.js");

	// EXTRA section
	load("replace/extra/tripbutton.js");
	load("replace/extra/altmenu.js");
	load("replace/extra/chatlist.js");

	// REPLACE engine should be included the after all replacers
}

function openPrefs() {
	var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
	.getService(Components.interfaces.nsIWindowMediator);
	var mainWindow = wm.getMostRecentWindow("navigator:browser");
	if(!mainWindow) return;
	mainWindow.openDialog( 'chrome://ffdawfix/content/preferences.xul','Preferences', null, 'aboutTab' );
}

function startup(data, reason) {
	initResources( data.installPath );
	loadScripts();
	
	if( reason == ADDON_INSTALL || reason == ADDON_UPGRADE || reason == ADDON_DOWNGRADE ) {
		openPrefs();
	}

	/// <summary>
    /// Bootstrap data structure @see https://developer.mozilla.org/en-US/docs/Extensions/Bootstrapped_extensions#Bootstrap_data
    /// &#10;  string id
    /// &#10;  string version
    /// &#10;  nsIFile installPath
    /// &#10;  nsIURI resourceURI
    /// &#10;
    /// Reason types:
    /// &#10;  APP_STARTUP
    /// &#10;  ADDON_ENABLE
    /// &#10;  ADDON_INSTALL
    /// &#10;  ADDON_UPGRADE
    /// &#10;  ADDON_DOWNGRADE
    /// </summary>
}

function shutdown(data, reason) {
	// When the application is shutting down we normally don't have to clean up any UI changes made
	if (reason == APP_SHUTDOWN) return;
	
	var load = loadScript.bind( this, pluginContext );
	load("core/onunload.js");
	unloadScripts();
	deinitResources();

	/// <summary>
    /// Bootstrap data structure @see https://developer.mozilla.org/en-US/docs/Extensions/Bootstrapped_extensions#Bootstrap_data
    /// &#10;  string id
    /// &#10;  string version
    /// &#10;  nsIFile installPath
    /// &#10;  nsIURI resourceURI
    /// &#10;
    /// Reason types:
    /// &#10;  APP_SHUTDOWN
    /// &#10;  ADDON_DISABLE
    /// &#10;  ADDON_UNINSTALL
    /// &#10;  ADDON_UPGRADE
    /// &#10;  ADDON_DOWNGRADE
    /// </summary>
}

var branch = "ru.dclan.ffdawfix";

function deletePrefs() {
	var pm = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
	pm.deleteBranch( branch );
}

function setTrueIfNotSet(name) {
	var pm = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch);
	var prefix = branch + ".";
	var prefName = prefix + name;
	try {
		pm.getBoolPref(prefName);
	} catch(e) {
		pm.setBoolPref( prefName, true );
		return true;
	}
	return false;
}

function install(data, reason) {
	log("install ffdawfix");

	var defaults = [
	  "ringsFix",
	  "giftsFix",
	  "battleSound",
	  "tripButton",
	  "battleLinks",
	  "liveTimers",
	  "chatList",
	  "gsearch",
	  "chatInp",
	];

	log("setting default properties");
	Array.forEach(defaults, function(x) { 
		if( setTrueIfNotSet(x)) { log("Default for "+ x + " set to true"); }
	} );
	
	/// <summary>
    /// Bootstrap data structure @see https://developer.mozilla.org/en-US/docs/Extensions/Bootstrapped_extensions#Bootstrap_data
    /// &#10;  string id
    /// &#10;  string version
    /// &#10;  nsIFile installPath
    /// &#10;  nsIURI resourceURI
    /// &#10;
    /// Reason types:
    /// &#10;  ADDON_INSTALL
    /// &#10;  ADDON_UPGRADE
    /// &#10;  ADDON_DOWNGRADE
    /// </summary>
}

function uninstall(data, reason) {
	log("uninstall ffdawfix");
	if( reason != ADDON_UNINSTALL ) return;
	deletePrefs();
	/// <summary>
    /// Bootstrap data structure @see https://developer.mozilla.org/en-US/docs/Extensions/Bootstrapped_extensions#Bootstrap_data
    /// &#10;  string id
    /// &#10;  string version
    /// &#10;  nsIFile installPath
    /// &#10;  nsIURI resourceURI
    /// &#10;
    /// Reason types:
    /// &#10;  ADDON_UNINSTALL
    /// &#10;  ADDON_UPGRADE
    /// &#10;  ADDON_DOWNGRADE
    /// </summary>
}