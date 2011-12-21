// Replace listener makes it possible to replace HTML !!!text!!! before it passes to the browser

//Helper function for XPCOM instanciation (from Firebug)
if(!CCIN) {
	var CCIN = function(cName, ifaceName) {
		return Cc[cName].createInstance(Ci[ifaceName]);
	}
}

// Copy response listener implementation.
ru.dclan.ffdawfix.ReplaceListener = function(rl) {
	this.originalListener = null;
	this.relacersList = rl;
	this.receivedData = [];   // array for incoming data.
}

ru.dclan.ffdawfix.ReplaceListener.prototype = {
	onDataAvailable: function(request, context, inputStream, offset, count) {
		var binaryInputStream = CCIN("@mozilla.org/binaryinputstream;1",
			"nsIBinaryInputStream");
		var storageStream = CCIN("@mozilla.org/storagestream;1", "nsIStorageStream");
		var binaryOutputStream = CCIN("@mozilla.org/binaryoutputstream;1",
			"nsIBinaryOutputStream");

		binaryInputStream.setInputStream(inputStream);
		storageStream.init(8192, count, null);
		binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));

		// Copy received data as they come.
		var data = binaryInputStream.readBytes(count);
		this.receivedData.push(data);

		binaryOutputStream.writeBytes(data, count);
	},

	onStartRequest: function(request, context) {
		this.originalListener.onStartRequest(request, context);
	},

	onStopRequest: function(request, context, statusCode) {
		var original = this.receivedData.join('');
		var changed = original;
		for(var i = 0; i < this.relacersList.length; ++i) {
			var replacer = this.relacersList[i];
			var replacerText = "> " + i + " <" + replacer;
			try {
				changed = replacer(changed);
			} catch(e) {
				alert("Exception while executing replacer: " + e
						+ "\n"
						+ replacerText
				);
			}
		}
		var count = changed.length;
		{
			var storageStream = CCIN("@mozilla.org/storagestream;1", "nsIStorageStream");
			var binaryOutputStream = CCIN("@mozilla.org/binaryoutputstream;1", "nsIBinaryOutputStream");
			
			if(count > 0) { 
				storageStream.init(1024, count, null);
				binaryOutputStream.setOutputStream(storageStream.getOutputStream(0));

				try {
					binaryOutputStream.writeBytes(changed, count);
				} catch(e) {
					ru.dclan.ffdawfix.utils.log("Exception on writeBytes: " + e);
				}

				try {
					this.originalListener.onDataAvailable(request, context,
						storageStream.newInputStream(0), 0, count);
				} catch(e) {
					ru.dclan.ffdawfix.utils.log("Exception on passing data to onDataAvailable: " + e);
				}
			}
		}

		this.originalListener.onStopRequest(request, context, statusCode);
	},

	QueryInterface: function (aIID) {
		if (aIID.equals(Ci.nsIStreamListener) ||
				aIID.equals(Ci.nsISupports)) {
			return this;
		}
		throw Components.results.NS_NOINTERFACE;
	}
}

ru.dclan.ffdawfix.utils.trackLoad("ru.dclan.ffdawfix.ReplaceListener");