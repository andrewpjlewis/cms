import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
    documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  private apiUrl = 'http://localhost:3000/api/documents';

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>(this.apiUrl)
      .subscribe(res => {
        this.documents = res.documents || [];
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  addDocument(doc: Document) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string, document: Document }>(this.apiUrl, doc, { headers })
      .subscribe(res => {
        this.documents.push(res.document);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  updateDocument(original: Document, updated: Document) {
    if (!original || !updated) return;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<{ message: string, document: Document }>(`${this.apiUrl}/${original.id}`, updated, { headers })
      .subscribe(res => {
        const pos = this.documents.indexOf(original);
        if (pos >= 0) this.documents[pos] = res.document;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  deleteDocument(doc: Document) {
    if (!doc) return;
    this.http.delete<{ message: string }>(`${this.apiUrl}/${doc.id}`)
      .subscribe(() => {
        this.documents = this.documents.filter(d => d.id !== doc.id);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getDocument(id: string) {
    return this.documents.find(d => d.id === id) || null;
  }
}
