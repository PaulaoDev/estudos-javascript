"use strict";

const Sync = (fn, c = true) => {
	return new Promise((resolve, reject) => { 
		try { 
			resolve(fn()); 
		} catch(err){ 
			if(c === false) resolve({err: err.message});
			if(c) reject(err.message);
		}
	})
}

/*Sync(function(){
	return nome;
}, false)
.then((res) => {
	if(res.err) throw res.err;
    console.log(res);
})
.catch((err) => console.log(err))*/


export {Sync};