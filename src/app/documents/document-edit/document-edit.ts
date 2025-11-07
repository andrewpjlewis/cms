import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-edit.html',
  styleUrl: './document-edit.css'
})
export class DocumentEdit implements OnInit{
  document: Document = new Document('', '', '', '');
  originalDocument!: Document;
  editMode = false;

  constructor(
  private documentService: DocumentService,
  private router: Router,
  private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
    
      if (!id) {
        this.editMode = false;
        return;
      }
    
      const doc = this.documentService.getDocument(id); // <-- may return null
      if (!doc) {
        return;
      }
    
      this.originalDocument = doc;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }
  
  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document('', value.name, value.description, value.url);
  
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
  
    this.router.navigate(['/documents']);
  }


  onCancel() {
    this.router.navigate(['/documents']);
  }
}
