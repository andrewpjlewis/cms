import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  private apiUrl = 'http://localhost:3000/api/messages';

  constructor(private http: HttpClient) {
    this.getMessages();
  }

  getMessages() {
    this.http.get<{ message: string, messages: Message[] }>(this.apiUrl)
      .subscribe(res => {
        this.messages = res.messages || [];
        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  addMessage(msg: Message) {
    if (!msg) return;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<{ message: string, messageObj: Message }>(this.apiUrl, msg, { headers })
      .subscribe(res => {
        this.messages.push(res.messageObj);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
