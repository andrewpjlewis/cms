import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';
import { ContactItemComponent } from '../contact-item/contact-item';
import { ContactService } from '../contact';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactsFilterPipe } from '../contacts-filter-pipe';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent, RouterModule, ContactsFilterPipe],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription!: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Trigger HTTP GET
    this.contactService.getContacts();

    // Subscribe to the event for updated contacts
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactsList: Contact[]) => {
        this.contacts = contactsList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelected(contact: Contact) {
    // Fixed property name
    this.contactService.contactSelectedEvent.emit(contact);
  }

  trackById(index: number, contact: Contact) {
    return contact.id;
  }

  search(value: string) {
    this.term = value;
  }
}
