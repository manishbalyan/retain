/**
 * Created by consultadd on 2/8/16.
 */
import {Component} from '@angular/core';
import { AppBar} from '../uI'
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'main-container',
    template: `
        <div>
            <app-bar></app-bar>
            <main class="main">
                 <router-outlet></router-outlet>
            </main>
           
        </div>
`,
    directives: [AppBar, ...ROUTER_DIRECTIVES]
})

export class Main{

}