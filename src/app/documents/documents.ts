import { Component } from '@angular/core';
import { DocumentDetail } from './document-detail/document-detail';
import { DocumentList } from './document-list/document-list';
import { CommonModule } from '@angular/common';
import { Document } from  './document.model';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentDetail, DocumentList, CommonModule],
  templateUrl: './documents.html',
  styleUrls: ['./documents.css']
})
export class Documents {
  selectedDocument?: Document;

  onSelectedDocument(doc: Document) {
    this.selectedDocument = doc;
  }
}