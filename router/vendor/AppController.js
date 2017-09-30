"use strict";

export class KhanController{

	constructor(){
		if(!("index" in this))
			return () => console.log("Default!!");
		else
			return this["index"];
	}

}