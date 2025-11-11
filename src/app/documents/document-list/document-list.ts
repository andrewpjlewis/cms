import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document';
import { DocumentItem } from '../document-item/document-item';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: true,
  imports: [DocumentItem, CommonModule, RouterLink],
  templateUrl: './document-list.html',
  styleUrls: ['./document-list.css']
})
export class DocumentList implements OnInit, OnDestroy {
  documents: Document[] = [];
  subscription!: Subscription;

  constructor(
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.documentService.getDocuments();
  
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentsList: Document[]) => {
        this.documents = documentsList;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
