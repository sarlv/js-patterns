describe('Core module', function() {

	// base functions in Core
    it('function base.isArray', function() {
        expect(Core.base.isArray([])).toBe(true);
    });

    it('function base.isObject', function() {
        expect(Core.base.isObject({})).toBe(true);
    });

    it('function base.isFunction', function() {
        expect(Core.base.isFunction(function() {})).toBe(true);
    });

    // jQuery function in Core
    if('bind jquery event', function() {
    	Core.jq.bindEvt('load', window, function() {
    		console.log('Load...');
    	})
    });

});
