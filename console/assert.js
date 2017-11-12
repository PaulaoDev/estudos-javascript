"use strict";

console.success = (() => {
	if(console.sucess) return console.success;
	let style = `
		color: #27ae60;
		background: #2ecc7166;
		font-size: 13px;
		padding: 3px
	`;
	return async function(message){ console.log(`%c> ${message}`, style); }
})();

window.assert = (e, m) => (!e) ? console.assert(e, m) : console.success(m);

// Test
assert(1 > 1, 'Sucesso ai men!!');