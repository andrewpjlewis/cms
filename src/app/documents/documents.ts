// documents.ts
import { Component } from '@angular/core';
import { DocumentItem } from './document-item/document-item';
import { DocumentDetail } from './document-detail/document-detail';
import { DocumentList } from './document-list/document-list';
import { CommonModule } from '@angular/common'; // needed for ngIf/ngFor etc

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentItem, DocumentDetail, DocumentList, CommonModule],  // <--- important
  templateUrl: './documents.html',
  styleUrls: ['./documents.css']
})
export class Documents {
  selectedDocument?: any;

  onSelectedDocument(doc: any) {
    this.selectedDocument = doc;
  }
}