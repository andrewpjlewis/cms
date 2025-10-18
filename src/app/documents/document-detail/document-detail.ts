import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-detail',
  standalone: true,
  templateUrl: './document-detail.html',
  styleUrls: ['./document-detail.css']
})
export class DocumentDetail {
  @Input() document: Document | null = null;
}
