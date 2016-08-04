/**
 * Created by consultadd on 4/8/16.
 */
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {ApiService} from "./api";
import {StoreHelper} from "./store-helper";
import {Store} from "../store";

@Injectable()
export class AuthService  implements CanActivate {
    JWT_KEY: string = 'retain_token';
    constructor(private router: Router, private  apiservice: ApiService, private storeHelper: StoreHelper, private store: Store){
        const token = window.localStorage.getItem(this.JWT_KEY);
        if (token) {
            this.setJwt(token);
        }
    }


    setJwt(jwt: string){
        window.localStorage.setItem(this.JWT_KEY, jwt),
            this.apiservice.setHeaders({Authorization: `Bearer ${jwt}`});
    }

    authenticate(path, cred){
        localStorage.setItem('path', path);
        localStorage.setItem('cred', cred);

        return this.apiservice.post(`/${path}`, cred)
            .do(res => this.setJwt(res.token))
            .do(res => this.storeHelper.update)
            .map(res => res.data);
    }

    signout(){
        window.localStorage.removeItem(this.JWT_KEY);
        this.store.purge();
        this.router.navigate(['', 'auth']);
    }

    isAuthorized(): boolean{
        return Boolean(window.localStorage.getItem(this.JWT_KEY));
    }

    canActivate(): boolean{
        const isAuth = this.isAuthorized();

        if (!isAuth){
            this.router.navigate(['', 'auth']);
        }
        return isAuth;
    }
}