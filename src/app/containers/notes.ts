/**
 * Created by consultadd on 2/8/16.
 */
import {Component} from '@angular/core';
import {NoteCard} from "../uI/note-card";
import {NoteCreator} from "../uI/note-creator";

@Component({
    selector: 'notes-container',
    template: `
        <div class="row center-xs notes">
            <div class="col-xs-6 creator">
                <note-creator (createNote)="onCreateNote($event)" ></note-creator>
            </div>
            <div class="notes col-xs-8">
                <div class="row between-xs">
                    <note-card class="col-xs-4"[note]="note" *ngFor="let note of notes; let i = index" (checked)="onNoteChecked($event, i)">
                        
                    </note-card>
                </div>
            </div>
        </div>
`,
    styles: [`
        .notes {
            padding-top: 50px;
        }
        
        .creator {
            margin-bottom: 40px; 
        }
         
`],
    directives: [NoteCard, NoteCreator],
})

export class Notes{
    notes = [
        {title: 'new note', value: 'note here', color: 'seagreen'},
        {title: 'new note1', value: 'note here1', color: 'lightblue'},
        {title: 'new note2', value: 'note here2', color: 'yellow'},

    ];

    onNoteChecked(note, i){
        this.notes.splice(i,1);
    }

    onCreateNote(note){
        this.notes.push(note);
    }
}