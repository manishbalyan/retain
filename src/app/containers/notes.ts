/**
 * Created by consultadd on 2/8/16.
 */
import {Component, OnDestroy} from '@angular/core';
import {NoteCard} from "../uI/note-card";
import {NoteCreator} from "../uI/note-creator";
import {NoteService} from "../services/notes";

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

export class Notes implements OnDestroy{
    notes = [];
    ngOnDestroy(){
        console.log("Destroyed");
    }
    constructor(private noteService: NoteService){
        this.noteService.getNotes()
            .subscribe(res => this.notes = res.data);
    }

    onNoteChecked(note, i){
        this.noteService.completeNote(note)
            .subscribe(note => {
                const i = this.notes.findIndex(localNote => localNote.id === note.id);
                this.notes.splice(i,1);
            })
    }

    onCreateNote(note){
        this.noteService.createNote(note)
            .subscribe(note => this.notes.push(note));
        console.log(this.notes);
    }
}