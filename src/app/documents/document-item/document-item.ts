import { Component, Input } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  templateUrl: './document-item.html',
  styleUrls: ['./document-item.css']
})
export class DocumentItem {
  @Input() document!: Document;
}
