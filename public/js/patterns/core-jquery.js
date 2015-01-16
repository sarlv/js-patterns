/**
	Core module
	This module based on NC Zakas presentation
	https://www.youtube.com/watch?v=b5pFv9NB9fs
*/

'use strict'

var Core = (function() {
    var moduleData = {}, debug = false, Sn = {};
    
    function createInstance(moduleId) {
        var instance = moduleData[moduleId].creator(new Sandbox(this)),
            name, method;

        if (!debug) {
            for (name in instance) {
                method = instance[name];
                if (typeof method == "function") {
                    instance[name] = function(name, method) {
                        return function() {
                            try {
                                return method.apply(this, arguments);
                            } catch (ex) {
                                log(1, name + "(): " + ex.message);
                            }
                        };
                    }(name, method);
                }
            }
        }
        return instance;
    }
    
    return {
        register: function(moduleId, creator) {
            moduleData[moduleId] = {
                creator: creator,
                instance: null
            };
        },

        start: function(moduleId) {
            moduleData[moduleId].instance = moduleData[moduleId].creator(new Sandbox(this));
            moduleData[moduleId].instance.init();

            if (!debug) {
	            for (name in moduleData[moduleId].instance) {
	                method = moduleData[moduleId].instance[name];
	                if (typeof method == "function") {
	                    moduleData[moduleId].instance[name] = function(name, method) {
	                        return function() {
	                            try {
	                                return method.apply(this, arguments);
	                            } catch (ex) {
	                                log(1, name + "(): " + ex.message);
	                            }
	                        };
	                    }(name, method);
	                }
	            }
	        }
	        return moduleData[moduleId].instance;
        },

        stop: function(moduleId) {
            var data = moduleData[moduleId];
            if (data.instance) {
                data.instance.destroy();
                data.instance = null;
            }
        },

        registerEvent: function(channel, fn, ctx) {
            var l = channel.length;

            while (l--) {
                if (!Sn[channel[ l ]]) {
                    Sn[channel[ l ]] = [];
                }

                Sn[channel[ l ]].push({
                    context: ctx,
                    callback: fn
                });
            }

            return ctx;
        },

        trigerEvent: function(channel) {
            if (!Sn[channel.type]) {
                return false;
            }

            var objs = Sn,
                ctype = objs[ channel.type ],
                l = ctype.length;

            while(l--) {
                ctype[ l ].callback.call(ctype[ l ].context, channel);
            }
        },

        startAll: function() {
            for (var moduleId in moduleData) {
                if (moduleData.hasOwnProperty(moduleId)) {
                    this.start(moduleId);
                }
            }
        },

        stoptAll: function() {
            for (var moduleId in moduleData) {
                if (moduleData.hasOwnProperty(moduleId)) {
                    this.stop(moduleId);
                }
            }
        },
        base: {
            _string: Object.prototype.toString,
            
            isArray: function(arr) {
                if(this._string.call(arr) === '[object Array]') {
                    return true;
                }
            },

            isObject: function(obj) {
                if(this._string.call(obj) === '[object Object]') {
                    return true;
                }
            },

            isFunction: function(fn) {
                if(this._string.call(fn) === '[object Function]') {
                    return true;
                }
            }
        },
        jq: {
            bindEvt: function(type, selector, fn) {
                $(selector).bind(type, fn);
            },

            unbindEvt: function(type, selector) {
                $(selector).unbind(type);
            }
        }
    }

}());












