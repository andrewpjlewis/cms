import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from  './document.model';
import { DocumentList } from './document-list/document-list';
import { DocumentDetail } from './document-detail/document-detail';
import { DocumentService } from './document';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentDetail, DocumentList, CommonModule],
  templateUrl: './documents.html',
  styleUrls: ['./documents.css']
})
export class Documents implements OnInit{
  selectedDocument: Document | null = null;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe(
      (doc: Document) => {
        this.selectedDocument = doc;
      }
    );
  }
}