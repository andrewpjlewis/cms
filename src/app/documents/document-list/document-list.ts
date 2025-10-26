import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document';
import { DocumentItem } from '../document-item/document-item';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItem, CommonModule, RouterLink],
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css']
})
export class DocumentList implements OnInit {
  documents: Document[] = [];

  constructor(
    private documentService: DocumentService,
    private router: Router) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }
}
