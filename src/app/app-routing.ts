import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentsComponent } from './documents/documents';
import { DocumentDetail } from './documents/document-detail/document-detail';
import { DocumentEdit } from './documents/document-edit/document-edit';
import { MessageList } from './messages/message-list/message-list';
import { ContactsComponent } from './contacts/contacts';

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
  { path: 'messages', component: MessageList },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
