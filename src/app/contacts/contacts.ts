import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list';
import { ContactDetailComponent } from './contact-detail/contact-detail';

@Component({
  selector: 'cms-contacts',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css']
})
export class Contacts {}