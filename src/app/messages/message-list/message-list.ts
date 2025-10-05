import { Component } from '@angular/core';
import { Message } from '../message.model';
import { MessageItem } from '../message-item/message-item';
import { MessageEdit } from '../message-edit/message-edit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItem, MessageEdit],
  templateUrl: './message-list.html',
  styleUrls: ['./message-list.css']
})
export class MessageList {
  messages: Message[] = [
    new Message('1','Hello', 'Hi there! How are you?', 'Alice'),
    new Message('2', 'Meeting', 'Don’t forget our meeting tomorrow.', 'Bob'),
    new Message('3', 'Lunch', 'Do you want to grab lunch today?', 'Charlie')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
