import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from './shared/dropdown';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cms-header',
  standalone: true,
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {}
