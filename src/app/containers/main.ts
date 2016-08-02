/**
 * Created by consultadd on 2/8/16.
 */
import {Component} from '@angular/core';
import { AppBar} from '../uI'
import {Notes} from "./notes";
@Component({
    selector: 'main-container',
    template: `
        <div>
            <app-bar></app-bar>
            <main class="main">
                 <notes-container></notes-container>
            </main>
           
        </div>
`,
    directives: [AppBar, Notes]
})

export class Main{

}