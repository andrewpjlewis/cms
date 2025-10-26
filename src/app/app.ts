import { Component } from '@angular/core';
import  { CommonModule } from '@angular/common';
import { Header } from './header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cms-root',
  standalone: true,
  imports: [Header, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}