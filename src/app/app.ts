/**
 * Created by consultadd on 2/8/16.
 */
import {Component} from '@angular/core';
import {Main} from './containers/main';
@Component({
    selector: 'app',
    template: `
       <main-container></main-container>
        `,
    directives: [Main]
})

export class App{

}