import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cms-document-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './document-item.html',
  styleUrls: ['./document-item.css']
})
export class DocumentItem {
  @Input() document!: Document;
}
