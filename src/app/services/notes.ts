import { Injectable } from '@angular/core';
import { ApiService } from './api';
import 'rxjs/Rx';
import {StoreHelper} from "./store-helper";


@Injectable()
export class NoteService {
    path: string = '/notes';
    constructor(private apiService: ApiService, private storeHelper: StoreHelper) {}

    createNote(note) {
        return this.apiService.post(this.path, note)
        .do(saveNote => this.storeHelper.add('notes', saveNote))
    }

    getNotes() {
        return this.apiService.get(this.path)
        .do(res => this.storeHelper.update('notes', res.data))
    }

    completeNote(note) {
        return this.apiService.delete(`${this.path}/${note.id}`)
        .do(res => this.storeHelper.findAndDelete('notes', res.id))
    }
}