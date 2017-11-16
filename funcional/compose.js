let compose = (...args) => (value) => args.reduce((cache, atual, index) => atual(cache(value)));

var comp = compose(
	(n) => n + " Hello",
	(n) => n + " Name"
);

comp("Paulao");
