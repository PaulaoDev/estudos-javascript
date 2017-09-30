"use strict";

export const Router = class {

    static Build(){
        if(!Router.instance){
            Router.instance = new this();
        }
        return Router.instance;
    }

    constructor(){
        this.root = '#/';
        this.routes = {};
        window.onhashchange = () => { this.update(); };
        window.Router = this;
    }

    update(){
        this.dispatch();
    }

    Pipeline(route){
        class Pipelines{
            
            constructor(path, injection){
                this.route = path;
                this.pipes = [];
                this.dependency = injection;
            }

            pipe(fn){
                this.pipes.push(fn);
                return this;
            }

            listen(){
                this.dependency.add(this.route, ...this["pipes"]);
            }

        }
        return new Pipelines(route, this);
    }

    add(route, ...callbacks){
        try {
            var n = (route !== "/") ? route.slice(1) : "/";
            this.routes[n] = {
                scope: callbacks,
                type: (route.includes("{") && route.includes("}")) ? "param" : "get",
                $db: []
            }
            return this;
        } catch(e){
            new Error("Erro: callback não é rota!! ", e);
        }
    }

    current(){
        if(location.hash == "") location.href = this.root;
        return window.location.hash.slice(1);
    }

    ifParam(route, uri){
        var context = ``,
            scoped = this.routes,
            routeSplit = route.split('/').map((r) => {
                if(r.includes("{") && r.includes("}")){
                    scoped[route]["$db"].push(/{(.*)}/.exec(r)[1]);
                    context += "/(.*)";
                }else{
                    context += "/" + r;
                }
            });
        var vv = new RegExp(context, "gi");
        var [, ...r] = vv.exec(uri);
        return {context: context,r: r};
    }

    isParam(route, context, uri){

        route = route.url;

        var routeCache = route,
            scoped = this.routes;

        var retorno = {
            "$db": {}
        };

        scoped[route]["params"] = scoped[route]["$db"];

        scoped[route]["$db"] = context;

        retorno["init"] = route;
        return retorno;

    }

    finding(route){
        var fnd = false,
            self = this;

        if(route in this.routes){
            fnd = {
                type: "get",
                bind: this.routes[route],
                init: route
            };
        }else{

            var Params = Object.keys(this.routes).map((e) => {
                if(self.routes[e]["type"] == "param"){
                    return Object.assign({url: e}, self.routes[e]);
                }
            });

            Params = Params.filter((p) => {
                return typeof p !== "undefined";
            });

            Params.map((p) => {
                var t = self.ifParam(p.url, route);
                var tet = new RegExp(t.context, "gi");
                if(tet.test(route)){
                    var evl = self.isParam(p, t.r, route);
                    if(evl){
                        fnd = {
                            type: "param",
                            bind: self.routes[evl.init],
                            init: evl.init
                        };
                    }
                }
            });

        }

        return fnd;

    }

    dispatch(){

        var Find = this.finding(this.current());

        if(Find){

            var Rota = Find.init,
                values = Find.bind.$db,
                params = false,
                fns = Find.bind.scope,
                pr = {};

            if("params" in Find.bind){
                Find.bind.params.map((p, i) => {
                    pr = Object.assign(pr, {[p]: values[i]});
                });
            }

            fns.map((fn) => {
                if(typeof fn == "function"){
                    if(values.length > 0)
                        fn.apply(this, [...values]);
                    else
                        fn();
                } else if(typeof fn == "string"){
                    if(Object.values(pr) > 0){
                        try{
                            fn(pr);
                        }catch(e){
                            throw e.message;
                        }
                    }else{
                        try{
                            fn();
                        }catch(e){
                            throw e.message;
                        }
                    }
                }
            });

        }else{
            throw Find;
        }

    }

}