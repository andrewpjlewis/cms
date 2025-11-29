import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId = 0;
  private apiUrl = 'http://localhost:3000/api/contacts';

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getMaxId(): number {
    return this.contacts.reduce((max, c) => Math.max(max, +c.id), 0);
  }

  getContacts() {
    this.http.get<{ message: string, contacts: Contact[] }>(this.apiUrl)
      .subscribe({
        next: res => {
          this.contacts = res.contacts || [];
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        error: err => console.error(err)
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string, contact: Contact }>(this.apiUrl, newContact, { headers })
      .subscribe(res => {
        this.contacts.push(res.contact);
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  updateContact(original: Contact, updated: Contact) {
    if (!original || !updated) return;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<{ message: string, contact: Contact }>(`${this.apiUrl}/${original.id}`, updated, { headers })
      .subscribe(res => {
        const pos = this.contacts.indexOf(original);
        if (pos >= 0) this.contacts[pos] = res.contact;
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    this.http.delete<{ message: string }>(`${this.apiUrl}/${contact.id}`)
      .subscribe(() => {
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string) {
    return this.contacts.find(c => c.id === id) || null;
  }
}
