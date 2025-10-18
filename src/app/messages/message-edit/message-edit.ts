import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../message.model';
import { MessageService } from '../message';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-edit.html',
  styleUrls: ['./message-edit.css']
})
export class MessageEdit {
  subject: string = '';
  msgText: string = '';

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    if (!this.msgText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      subject: this.subject,
      msgText: this.msgText,
      sender: '1' // mock sender id
    };

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear() {
    this.subject = '';
    this.msgText = '';
  }
}