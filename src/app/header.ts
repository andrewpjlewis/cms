import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from './shared/dropdown';

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [DropdownDirective],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
