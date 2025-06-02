import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesComponent } from './dashboard/notes/notes.component';
import { TrashComponent } from './dashboard/trash/trash.component';
import { ReminderComponent } from './dashboard/reminder/reminder.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'notes', component: NotesComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: 'trash', component: TrashComponent }
    ]
  }
];
