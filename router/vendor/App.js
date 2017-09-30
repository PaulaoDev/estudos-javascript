"use strict";

import {Controller} from './Controller.js';
import {View} from './View.js';
import {Router} from './Router.js';

export class App{

	static Build(){
		if(!App.instance){
			App.DB_APP = new Map();
			App.instance = new this();
		}
		return App.instance;
	}

	extend(cls){
		console.log(cls);
	}

	set(name, value){
		App.DB_APP.set(name, value);
		return true;
	}

	get(name){
		if(App.DB_APP.has(name))
			return App.DB_APP.get(name);
		else
			throw "Not exists " + name + " in Application!!";
	}

	constructor(){

		var self = this;

		const App = {
			set: self.set,
			get: self.get
		};

		return [
			Router,
			Controller,
			View,
			App
		]
		
	}

}