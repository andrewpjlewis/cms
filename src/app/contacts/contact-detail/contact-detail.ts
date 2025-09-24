import { Component } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: true,
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.css'
})
export class ContactDetailComponent {
  contact: Contact = new Contact(
    '',
    '',
    '',
    '',
    '',
    []
  );
}