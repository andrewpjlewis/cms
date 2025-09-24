import { Component, signal } from '@angular/core';
import { Header } from './header';
import { Contacts } from './contacts/contacts';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [Header, Contacts],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
