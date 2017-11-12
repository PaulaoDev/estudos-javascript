const assert = (c, m) => console.assert(c, m);
const hello_world = () => document.body.innerHTML += "<h1>Ola mundo!!</h1><br><h1>Modulo Importado!!</h1>";

module.exports = {
	"assert": assert,
	"hello": hello_world
};