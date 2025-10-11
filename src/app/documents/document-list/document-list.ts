import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentItem } from '../document-item/document-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItem, CommonModule],
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css']
})
export class DocumentList {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1','CIT 260 - Object Oriented Programming','Learn how to develop modern web applications using the MEAN stack.','https://example.com/cit260'),
    new Document('2','CIT 366 - Full Web Stack Development','Covers advanced client and server-side development, REST APIs, and deployment practices.','https://example.com/cit366'),
    new Document('3','CIT 425 - Data Warehousing','Focuses on database design, data integration, and analytics for large-scale systems.','https://example.com/cit425'),
    new Document('4','CIT 460 - Enterprise Development','Explores enterprise-level architecture, software patterns, and scalable system design.','https://example.com/cit460'),
    new Document('5','CIT 495 - Senior Practicum','A capstone course where students work on real-world projects for industry clients.','https://example.com/cit495')
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
