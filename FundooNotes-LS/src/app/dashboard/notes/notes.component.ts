import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  title: string = '';
  description: string = '';
  notes: any[] = [];

  // Added for editing
  editIndex: number | null = null;
  editedTitle: string = '';
  editedDescription: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.notesService.getNotes();
  }

  addNote(): void {
    if (!this.title.trim() && !this.description.trim()) return;
    const newNote = { title: this.title, description: this.description, reminder: null };
    this.notesService.addNote(newNote);
    this.title = '';
    this.description = '';
    this.notes = this.notesService.getNotes();
  }

  deleteNote(index: number): void {
    this.notesService.moveToTrash(index);
    this.notes = this.notesService.getNotes();
  }

  editNote(index: number): void {
    const note = this.notes[index];
    this.editIndex = index;
    this.editedTitle = note.title;
    this.editedDescription = note.description;
  }

  saveEditedNote(): void {
    if (this.editIndex === null) return;
    const updatedNote = {
      ...this.notes[this.editIndex],
      title: this.editedTitle,
      description: this.editedDescription
    };
    this.notesService.updateNote(this.editIndex, updatedNote);
    this.editIndex = null;
    this.notes = this.notesService.getNotes();
  }

 setReminder(index: number): void {
  const note = this.notes[index];
  const reminderTime = new Date(Date.now() + 30000); // 30 seconds from now
  note.reminder = reminderTime.toISOString();
  this.notesService.updateNote(index, note);
  this.notes = this.notesService.getNotes();

  // ✅ Confirmation alert right after setting the reminder
  alert(`Reminder set for "${note.title}" in 30 seconds.`);

  setTimeout(() => {
    alert(`Reminder: ${note.title}`);
  }, 30000);
}
}
