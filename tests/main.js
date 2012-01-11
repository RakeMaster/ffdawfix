if (Function.prototype.bind == null) {

    Function.prototype.bind = (function (slice){

        // (C) WebReflection - Mit Style License
        function bind(context) {

            var self = this; // "trapped" function reference

            // only if there is more than an argument
            // we are interested into more complex operations
            // this will speed up common bind creation
            // avoiding useless slices over arguments
            if (1 < arguments.length) {
                // extra arguments to send by default
                var $arguments = slice.call(arguments, 1);
                return function () {
                    return self.apply(
                        context,
                        // thanks @kangax for this suggestion
                        arguments.length ?
                            // concat arguments with those received
                            $arguments.concat(slice.call(arguments)) :
                            // send just arguments, no concat, no slice
                            $arguments
                    );
                };
            }
            // optimized callback
            return function () {
                // speed up when function is called without arguments
                return arguments.length ? self.apply(context, arguments) : self.call(context);
            };
        }

        // the named function
        return bind;

    }(Array.prototype.slice));
}

function createDiv(className, parent) {
	var r = document.createElement("div");
	r.className = className;
	if(parent) {
		parent.appendChild(r);
	}
	return r;
}

function TestSuite() {
	this.tests = [];
	this.ui = {};
	this.ui.wrapper = createDiv("test_wrapper");

	this.ui.run = document.createElement( "button" );
	this.ui.run.textContent = "Run";
	this.ui.wrapper.appendChild( this.ui.run );

	this.ui.stat = createDiv("test_stat", this.ui.wrapper);
	var bar = createDiv("test_bar", this.ui.wrapper);
	this.ui.fill = createDiv("test_bar_fill", bar);
	this.success = 0;
	this.failed = 0;
	this.ui.header = createDiv("test_header", this.ui.wrapper);

	this.logTrc =  function(m) {};
	this.logErr =  function(m) {};
	this.logCheck =  function(m) {};
	this.onDone =  function() {};
}

TestSuite.prototype = {
	init: function(name) {
		this.testName = name;
		this.ui.header.textContent = name;
		this.ui.run.onclick = this.run.bind(this);
		for (var m in this) {
			if(m.substr(0,4) != "test" || typeof(this[m]) != typeof(function(){})) continue;
			this.addTest(m, this[m].bind(this));
		}
	},
	addTest: function(title, call) {
		this.tests[this.tests.length] = {title: title, call: call};
	},
	getUI: function() {
		return this.ui.wrapper;
	},
	refreshUI: function() {
		this.ui.stat.textContent = this.success + "/" + this.tests.length;
		if(this.failed != 0) {
			this.ui.stat.className = "test_stat_fail";
		} else if(this.success == this.tests.length) {
			this.ui.stat.className = "test_stat_ok";
		} else {
			this.ui.stat.className = "test_stat";
		}
		this.ui.fill.style.width = (this.success*100/this.tests.length) + "%";
	},
	run: function() {
		if(this.tests.length == 0) return;
		this.logTrc("Running test suite " + this.testName);
		this.success = 0;
		this.failed = 0;
		this.runNext();
	},
	runNext: function() {
		var i = this.success + this.failed;
		var title = this.tests[i].title;
		var call = this.tests[i].call;
		try {
			call();
			++this.success;
			this.logTrc("Success of " + title + " in " + this.testName);
		} catch(e) {
			++this.failed;
			this.logErr("Error " + title + " in " + this.testName + ":\n" + e);
		}

		this.refreshUI();

		if(this.success + this.failed < this.tests.length) {
			var b = this.runNext.bind(this);
			setTimeout( b, 10);
		} else {
			this.logTrc("Finished test suite " + this.testName);
			this.onDone();
		}
	},
	trace: function(lvl) {
		try {
			i.dont.exist+=0;
		} catch(e) {
			var lines = e.stack.split("\n");
			var line = lines[lvl];
			var tmp;
			tmp = line.split("/");
			line = tmp[tmp.length - 1];
			tmp = line.split("\\");
			line = tmp[tmp.length - 1];
			return line;
		}
	},
	assert: function(val) {
		var trc =  this.trace(2) + ": ";
		if(!val) {
			throw trc + "Assertion failed";
		} else {
			this.logCheck( trc +  "Assertion passed");
		}
	},
	assertEquals: function(v1, v2) {
		var trc =  this.trace(2) + ": ";
		if(v1 != v2) {
			throw trc + "Assertion failed. " + v1 + " != " + v2;
		} else {
			this.logCheck( trc +  "Passed " + v1 + " == " + v2);
		}
	},

};

window.includes = [];

function include(name) {
	if(window.includes[name]) return;
	window.includes[name] = 1;
	var src = name;
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', src);
	document.getElementsByTagName('head')[0].appendChild(script);
}
