import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  maxMessageId: number = 0;
  firebaseUrl = 'https://lewiand1234-cms-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages() {
    this.http.get<Message[]>(this.firebaseUrl)
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages || [];
          this.maxMessageId = this.getMaxId();

          this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  storeMessages() {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, messagesString, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  addMessage(newMessage: Message) {
    if (!newMessage) return;

    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages();
  }
}
