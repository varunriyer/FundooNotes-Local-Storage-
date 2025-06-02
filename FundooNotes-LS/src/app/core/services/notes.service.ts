import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private NOTES_KEY = 'fundoo-notes';

  constructor() {}

  getNotes(): any[] {
    const notes = localStorage.getItem(this.NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  }

  saveNotes(notes: any[]) {
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  addNote(note: any) {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  }

  updateNote(index: number, updatedNote: any) {
    const notes = this.getNotes();
    notes[index] = updatedNote;
    this.saveNotes(notes);
  }

  deleteNote(index: number) {
    const notes = this.getNotes();
    notes.splice(index, 1);
    this.saveNotes(notes);
  }

  moveToTrash(index: number) {
    const notes = this.getNotes();
    const trashedNote = notes.splice(index, 1)[0];
    this.saveNotes(notes);

    const trash = this.getTrash();
    trash.push(trashedNote);
    this.saveTrash(trash);
  }

  getTrash(): any[] {
    const trash = localStorage.getItem('fundoo-trash');
    return trash ? JSON.parse(trash) : [];
  }

  saveTrash(trash: any[]) {
    localStorage.setItem('fundoo-trash', JSON.stringify(trash));
  }

  restoreFromTrash(index: number) {
    const trash = this.getTrash();
    const restoredNote = trash.splice(index, 1)[0];
    this.saveTrash(trash);

    const notes = this.getNotes();
    notes.push(restoredNote);
    this.saveNotes(notes);
  }

  getReminders(): any[] {
    return this.getNotes().filter(note => note.reminder);
  }
}
