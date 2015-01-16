/*
Composite
*/

// Constructor.

var Interface = function(name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
        }
        this.methods.push(methods[i]);
    }
};

// Static class method.

Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " +
            arguments.length + "arguments, but expected at least 2.");
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments " + "two and above to be instances of Interface.");
        }

        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
            }
        }
    }
};

function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var GalleryItem = new Interface('GalleryItem', ['hide', 'show']);


// DynamicGallery class.

var DynamicGallery = function(id) { // implements Composite, GalleryItem
    this.children = [];

    this.element = document.createElement('div');
    this.element.id = id;
    this.element.className = 'dynamic-gallery';
}

DynamicGallery.prototype = {

    // Implement the Composite interface.

    add: function(child) {
        Interface.ensureImplements(child, Composite, GalleryItem);
        this.children.push(child);
        this.element.appendChild(child.getElement());
    },
    remove: function(child) {
        for (var node, i = 0; node = this.getChild(i); i++) {
            if (node == child) {
                this.formComponents[i].splice(i, 1);
                break;
            }
        }
        this.element.removeChild(child.getElement());
    },
    getChild: function(i) {
        return this.children[i];
    },

    // Implement the GalleryItem interface.

    hide: function() {
        for (var node, i = 0; node = this.getChild(i); i++) {
            node.hide();
        }
        this.element.style.display = 'none';
    },
    show: function() {
        this.element.style.display = 'block';
        for (var node, i = 0; node = this.getChild(i); i++) {
            node.show();
        }
    },

    // Helper methods.

    getElement: function() {
        return this.element;
    }
};

// GalleryImage class.

var GalleryImage = function(src) { // implements Composite, GalleryItem
    this.element = document.createElement('img');
    this.element.className = 'gallery-image';
    this.element.src = src;
}

GalleryImage.prototype = {

    // Implement the Composite interface.

    add: function() {}, // This is a leaf node, so we don't
    remove: function() {}, // implement these methods, we just
    getChild: function() {}, // define them.

    // Implement the GalleryItem interface.

    hide: function() {
        this.element.style.display = 'none';
    },
    show: function() {
        this.element.style.display = ''; // Restore the display attribute to its 
        // previous setting.
    },

    // Helper methods.

    getElement: function() {
        return this.element;
    }
};

// Usage.

var topGallery = new DynamicGallery('top-gallery');

topGallery.add(new GalleryImage('/img/image-1.png'));
topGallery.add(new GalleryImage('/img/image-2.png'));
topGallery.add(new GalleryImage('/img/image-3.png'));

var vacationPhotos = new DynamicGallery('vacation-photos');

for (var i = 1; i < 4; i++) {
    vacationPhotos.add(new GalleryImage('/img/vac/image-' + i + '.png'));
}

topGallery.add(vacationPhotos);
topGallery.show(); // Show the main gallery,
//vacationPhotos.hide(); // but hide the vacation gallery.

console.log(topGallery.element)

var wrap = document.getElementById('results');

wrap.appendChild(topGallery.element);

/**
 Tree example
*/
var Node = function (name) {
    this.children = [];
    this.name = name;
}
 
Node.prototype = {
    add: function (child) {
        this.children.push(child);
    },
 
    remove: function (child) {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                return;
            }
        }
    },
 
    getChild: function (i) {
        return this.children[i];
    },
 
    hasChildren: function () {
        return this.children.length > 0;
    }
}
 
// recursively traverse a (sub)tree
 
function traverse(indent, node) {
    log.add(Array(indent++).join("--") + node.name);
 
    for (var i = 0, len = node.children.length; i < len; i++) {
        traverse(indent, node.getChild(i));
    }
}
 
// logging helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { console.log(log); log = ""; }
    }
})();
 
function Run() {
    var tree = new Node("root");
    var left = new Node("left")
    var right = new Node("right");
    var leftleft = new Node("leftleft");
    var leftright = new Node("leftright");
    var rightleft = new Node("rightleft");
    var rightright = new Node("rightright");
 
    tree.add(left);
    tree.add(right);
    tree.remove(right);  // note: remove
    tree.add(right);
 
    left.add(leftleft);
    left.add(leftright);
 
    right.add(rightleft);
    right.add(rightright);
 
    traverse(1, tree);
 
    log.show();

    return tree;
}

var run = new Run();

console.log(run);












