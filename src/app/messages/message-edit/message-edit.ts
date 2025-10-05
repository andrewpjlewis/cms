import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cms-message-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-edit.html',
})
export class MessageEdit {
  @Output() addMessageEvent = new EventEmitter<Message>();

  @ViewChild('subject') subjectInput!: ElementRef<HTMLInputElement>;
  @ViewChild('msgText') msgTextInput!: ElementRef<HTMLInputElement>;

  currentSender = 'Your Name';

  onSendMessage() {
    const newMessage = new Message(
      Math.floor(Math.random() * 1000).toString(),
      this.subjectInput.nativeElement.value,
      this.msgTextInput.nativeElement.value,
      this.currentSender
    );
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInput.nativeElement.value = '';
    this.msgTextInput.nativeElement.value = '';
  }
}
