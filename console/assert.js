console.success = (() => {
	if(!console.sucess){
		return async function(message){ console.log(`%c> ${message}`, "color:#27ae60;background:#2ecc7166;font-size:13px;padding:3px"); }
  }
})();
window.assert = (e, m) => (!e) ? new Error(m) : console.success(m);
assert(1 > 1, 'Sucesso ai men!!')
