import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  reminders: any[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.reminders = this.notesService.getReminders();
  }
}
