import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from  './document.model';
import { DocumentList } from './document-list/document-list';
import { DocumentService } from './document';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cms-documents',
  standalone: true,
  imports: [DocumentList, CommonModule, RouterOutlet],
  templateUrl: './documents.html',
  styleUrls: ['./documents.css']
})
export class DocumentsComponent implements OnInit{
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