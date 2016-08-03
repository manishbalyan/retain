/**
 * Created by consultadd on 2/8/16.
 */
import {Component, Output, EventEmitter, Input} from '@angular/core';
import {ColorPicker} from "./color-picker";


@Component({
    selector: 'note-creator',
    template: `
        <div class="note-creator shadow-2" [ngStyle]="{'background-color':newNote.color}">
        <!--<pre>{{newNote | json}}</pre>-->
            <form class="row" (submit)="onCreateNote()">
                <input type="text" [(ngModel)]="newNote.title" name="newNoteTitle" placeholder="Title" class="col-xs-10 title" *ngIf="fullForm">
                <input type="text" [(ngModel)]="newNote.value" name="newNoteValue" placeholder="Take a note..." class="col-xs-10" (focus)="toggle(true)">
                <div class="actions col-xs-12 row between-xs" *ngIf="fullForm">
                    <div class="col-xs-3">
                        <color-picker (selected)="onColorSelect($event)" [colors]="colors" ></color-picker>
                    </div>
                    <button type="submit" class="btn-light">Done</button>
                </div>
            </form>
        </div>
`,
    styles: [`
        .note-creator {
            padding: 20px;
            background-color: white;
            border-radius: 3px;
    }
    
        .title {
            font-weight: bold;
            color: rgba(0,0,0,0.8);
    }
    
        .full {
            height: 100px;
    }
    
`],
    directives: [ColorPicker]

})

export class NoteCreator{
    @Output() createNote = new EventEmitter();
    colors: Array<string> = ['#B19CD9', '#FF6961', '#77DD77', '#AEC6CF'];
    newNote = {
        title:'',
        value: '',
        color: 'white',
    }
    fullForm: boolean = false;

    onColorSelect(color: string){
        this.newNote.color = color;
    }

    onCreateNote(){
        const {title, value, color} = this.newNote;

        if (title && value){
            this.createNote.next({title, value, color});
            this.reset();
        }
    }

    reset(){
        this.newNote={
            title: '',
            value: '',
            color: 'white',
        }
    }
    toggle(value){
        this.fullForm = value;
    }

}