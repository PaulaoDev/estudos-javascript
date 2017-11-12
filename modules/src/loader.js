"use strict";

window.require = async(module) => {

	class Required{

		constructor(m){
			this.folder = (m.includes('.min')) ? m.replace('.min') : m;
			this.module = (m.includes('.js')) ? m : m + ".js";
			this.module_name = this.folder + '/' + this.module;
		}

		context(code){
			return `
				var exports = (!exports) ? exports = {} : exports;
				var module = (!module) ? module = {"exports": {}} : module;
				${code}
				let empty = (o) => (typeof o === 'object') ? Object.keys(o).length === 0 : false;
				if (!empty(exports)) return exports;
				if (!empty(module.exports)) return module.exports;
				delete module.exports;
				if (!empty(module)) return module;
			`;
		}

		run(){
			var m = this.module_name,
				context = this.context;
			return (async(m, context) => {
				var response = await fetch('khan_modules/' + m);
        		var data = await response.text();
        		return new Function('', context(data))();
			})(m, context);
		}

	}

    try {
    	var r = new Required(module);
    	return r.run();
    } catch (e) {
        new Error(e);
    }

};
