import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageItem } from '../message-item/message-item';
import { MessageEdit } from '../message-edit/message-edit';
import { MessageService } from '../message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItem, MessageEdit],
  templateUrl: './message-list.html',
  styleUrls: ['./message-list.css']
})
export class MessageList implements OnInit, OnDestroy {
  messages: Message[] = [];
  subscription!: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    // Trigger HTTP GET
    this.messageService.getMessages();

    // Subscribe to updated messages
    this.subscription = this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
