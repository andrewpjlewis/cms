import { Component } from '@angular/core';
import  { CommonModule } from '@angular/common';
import { Header } from './header';
import { Contacts } from './contacts/contacts';
import { Documents } from './documents/documents';
import { MessageList } from './messages/message-list/message-list';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [Header, Contacts, Documents, MessageList, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Default feature
  selectedFeature: string = 'documents';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
