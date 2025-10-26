import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent } from './documents/documents';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DocumentEdit } from './documents/document-edit/document-edit';

import { ContactsComponent } from './contacts/contacts';
import { ContactEdit } from './contacts/contact-edit/contact-edit'
import { ContactDetail } from './contacts/contact-detail/contact-detail';

import { MessageList } from './messages/message-list/message-list';

const routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents',
    component: DocumentsComponent,
    children: [
      { path: 'new', component: DocumentEdit },
      { path: ':id', component: DocumentDetail },
      { path: ':id/edit', component: DocumentEdit }
    ]
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      { path: 'new', component: ContactEdit },
      { path: ':id', component: ContactDetail },
      { path: ':id/edit', component: ContactEdit }
    ] 
  },
  { path: 'messages', component: MessageList, },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
