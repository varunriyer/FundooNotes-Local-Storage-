import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {
  trashNotes: any[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.trashNotes = this.notesService.getTrash();
  }

  restoreNote(index: number) {
    this.notesService.restoreFromTrash(index);
    this.trashNotes = this.notesService.getTrash();
  }
}
