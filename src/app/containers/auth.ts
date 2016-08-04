/**
 * Created by consultadd on 4/8/16.
 */
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth";
@Component({
    selector: 'auth-container',
    template: `     
        <div class="auth row center-xs middle-xs">
            <form class="col-xs-6 shadow-2" #authForm = "ngForm" (submit)="authenticate()">
                <div class="inputs row center-xs middle-xs">
                    <h3 class="col-xs-8 title">
                        {{mode}}
                    </h3>
                    <input class="col-xs-8" type="email" name="email" placeholder="email" 
                    [(ngModel)]="user.email" required #email = "ngModel">
                        <div class="error" [hidden] = "email.valid || email.pristine">email is required</div>
                    <input class="col-xs-8" type="password" name="password" placeholder="password" 
                    [(ngModel)]="user.password" required #password="ngModel">
                        <div class="error" [hidden] = "password.valid || password.pristine">password is required</div>
                    <div class="actions col-xs-12">
                        <div class="row center-xs">
                            <button type="submit" class="btn-light" [disabled] = "!authForm.form.valid">{{mode}}</button>
                            <a class="btn-light link" (click)="changeMode()">{{linkText}}</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
  `,
    styles: [`
        .auth {
            height: 100%;
        }
        
        input {
            border-bottom: 1px solid lightgrey;
        }
        
        .ng-invalid.ng-dirty {
            border-bottom: 1px solid red;
        }
        
        form {
            width: 100%;
            border-radius: 2px;
            background-color: white;
            padding: 20px;
            height: 400px;
        }
        
        .inputs {
            height: 100%;
            position: relative;
        }
        
        .link {
            color: lightblue;
        }
        
        .link:hover {
            background-color: transparent;
            color: blue;
        }
        
        .title {
            font-size: 36px;
            font-weight: 300;
            text-transform: capitalize;
        }
        
            .error {
            color: red;
            position: relative;
            left: 10px; 	
        }
`]
})

export class Auth {
    user = {
        email: '',
        password: '',
    };
    mode: string = 'signin';
    linkText: string = 'Dont have an Account?';

    constructor(private router: Router, private authService: AuthService){}

    changeMode(){
        if (this.mode === 'signin'){
            this.mode = 'signup';
            this.linkText = 'Already have an Account';
        }
        else{
            this.mode = 'signin';
            this.linkText = 'Dont have an Account?';
        }

    }

    authenticate(){
        console.log('this.user', this.user);
        this.authService.authenticate(this.mode, this.user)
            .subscribe(()=> {
                console.log('success ok');


            })
    }
}