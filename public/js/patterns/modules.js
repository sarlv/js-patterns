/*
NC Zakaz modules pattern
based on: https://www.youtube.com/watch?v=b5pFv9NB9fs
and article from Addy Osmani
http://addyosmani.com/largescalejavascript/
*/

var Sandbox = function(core, moduleId) {
    
    return {
        installTo: function(obj) {
            obj.listen = listen;
            obj.notify = notify;
        },

        listen: function(channel, fn, ctx) {
            var l = channel.length;

            while (l--) {
                if (!Sandbox.channels[channel[ l ]]) {
                    Sandbox.channels[channel[ l ]] = [];
                }

                Sandbox.channels[channel[ l ]].push({
                    context: ctx,
                    callback: fn
                });
            }

            return ctx;
        },

        notify: function(channel) {

            if (!Sandbox.channels[channel.type]) {
                return false;
            }

            var objs = Sandbox.channels,
                ctype = objs[ channel.type ],
                l = ctype.length;

            while(l--) {
                ctype[ l ].callback.call(ctype[ l ].context, channel);
            }

        }
    }
};

Sandbox.channels = {};

Core = (function() {
    var moduleData = {};

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


