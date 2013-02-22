var shutdownCalls = []

function addOnShutdown( f ) {
	shutdownCalls[ shutdownCalls.length ] = f;
}

function callShutdowns() {
	Array.forEach(shutdownCalls, function(call) { call(); } );
	shutdownCalls = [];
}