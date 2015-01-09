/*
NC Zakaz modules pattern
based on: https://www.youtube.com/watch?v=b5pFv9NB9fs
and article from Addy Osmani
http://addyosmani.com/largescalejavascript/
*/


var Sandbox = function(core, moduleId) {

    var base = core.base;
    
    return {
        installTo: function(obj) {
            obj.listen = listen;
            obj.notify = notify;
        },

        listen: function(channel, fn, ctx) {

            if(!base.isArray(channel)) {
                throw new Error('Expected array');
            }

            if(!base.isFunction(fn)) {
                throw new Error('Expected function');
            }

            if(!base.isObject(ctx)) {
                throw new Error('Expected object');
            }

            Core.registerEvent(channel, fn, ctx);
        },

        notify: function(channel) {
            if(!base.isObject(channel)) {
                throw new Error('Expected object');
            }
            Core.trigerEvent(channel);
        }
    }
};

Core = (function() {
    var moduleData = {}, debug = false, Sn = {};
    
    function createInstance(moduleId) {
        var instance =
            moduleData[moduleId].creator(new Sandbox(this)),
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
        }
    }

}());

Core.register('timeline', function(sandbox) {

    return {
        init: function() {
            sandbox.listen([
                'timeline-filter-changed',
                'post-status'
            ], this.handleNotification, this);

        },

        destroy: function() {

        },

        applayFilter: function(arg) {
            console.log(arg);
        },

        post: function(arg) {
            console.log(arg)
        },

        handleNotification: function(note) {
            switch (note.type) {
                case 'timeline-filter-changed':
                    this.applayFilter(note.data);
                    return;
                case 'post-status':
                    this.post(note.data);
                    return;
            }
        }
    }

});

Core.register('timeline-filter', function(sandbox) {

    return {
        init: function() {
            this.changeFilter('This is text message!');
        },

        destroy: function() {

        },

        changeFilter: function(filter) {
            sandbox.notify({
                type: 'timeline-filter-changed',
                data: filter
            });
        }
    }

});

Core.register('status-poster', function(sandbox) {

    return {
        init: function() {
            this.postStatus('Post status text');
        },

        destroy: function() {

        },

        postStatus: function(statusText) {
            sandbox.notify({
                type: 'post-status',
                data: statusText
            });
        }
    }

});



Core.startAll();


