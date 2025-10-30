import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.model';
import { ContactItemComponent } from '../contact-item/contact-item';
import { ContactService } from '../contact';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent, RouterModule],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription!: Subscription;

  constructor(private contactService: ContactService) { }


  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

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
    this.contactService.selectedContactEvent.emit(contact);
  }

  trackById(index: number, contact: Contact) {
    return contact.id;
  }
}