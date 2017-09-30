"use strict";

import { KhanController } from './AppController.js';

export class Controller extends KhanController {

	constructor(){
		super();
	}

	index(){
		console.log("INIT!!!");
	}

	static render(text, style){
		document.body.innerHTML += `<h1 style="${style}">${text}</h1>`;
	}

}